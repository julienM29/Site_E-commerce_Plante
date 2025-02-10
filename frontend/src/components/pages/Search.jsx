import React, { useState, useEffect } from 'react';
import ProductGrid from '../shared/ProductGrid';
import SwiperTest from '../shared/SwiperTest';
import FilterBar from '../shared/FilterBar';
import { useSearchParams } from "react-router-dom";

function Search() {
    const [selectType, setSelectType] = useState(false);
    const [typeChoice, setTypeChoice] = useState();
    const [types, setTypes] = useState([]);
    const [dataPlants, setDataPlants] = useState([]); // Toujours initialiser en tableau
    const [searchParams] = useSearchParams(); // Récupère les paramètres de l'URL
    const searchQuery = searchParams.get("q") || ""; // Extrait la valeur du paramètre "q"

    const loadTypesPlant = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/loadType', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();
            setTypes(data.types || []); // Toujours stocker un tableau
        } catch (error) {
            console.error('Erreur lors du chargement des types:', error);
        }
    };

    const loadPlants = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/loadAllProduct', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            if (Array.isArray(data.product)) {
                setDataPlants(data.product); // ✅ Stocker le tableau correctement
            } else {
                setDataPlants([]); // En cas d'erreur, éviter `{}` qui causerait un crash
            }
        } catch (error) {
            console.error('Erreur lors du chargement des plantes:', error);
            setDataPlants([]); // 🔥 Évite les erreurs en initialisant toujours avec []
        }
    };

    const searchByType = async (id, nom, image) => {
        try {
            const response = await fetch(`http://localhost:3000/productByType/${id}`, {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log('Réponse complète de l’API :', data); // 🔍 Debug ici
            setSelectType(true)
            setTypeChoice({ nom, id, image });
            if (Array.isArray(data.products)) { // ⚠️ Vérifie "products" et non "product"
                setDataPlants(data.products); // ✅ Corrigé

            } else {
                setDataPlants([]); // Sécurisation
            }
        } catch (error) {
            console.error('Erreur lors du chargement des plantes:', error);
            setDataPlants([]);
        }
    };


      const searchByText = async () => {
        try {
            const response = await fetch(`http://localhost:3000/searchByText/${searchQuery}`, {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            console.log("search by texte, products : " , data.products)
            setDataPlants(data.products);

        } catch (error) {
            console.error('Erreur lors du chargement des plantes:', error);
        }

    }
    useEffect(() => {
        loadTypesPlant();
        
        if (!searchQuery) {
            loadPlants();
        }
    }, []); 
    useEffect(() => {
        if (searchQuery) {
            searchByText(); // ✅ Maintenant, la fonction est bien exécutée
        }
    }, [searchQuery]);
    
    return (

        <div className="bg-custom-light py-6 min-h-screen flex flex-col items-center gap-6">
            <div className='w-10/12 flex gap-10'>
                <FilterBar />
                <div className='w-4/5 flex flex-col gap-4 flex-grow'>
                    {selectType ? <div className='flex justify-between w-full'>
                        <div className="relative flex justify-center border rounded-3xl overflow-hidden ">
                            {/* <img src={getImage(type.image)} alt="" className='rounded-2xl h-30 w-30' /> */}
                            <img src={`/images/${typeChoice.image}`} alt="test" className='object-cover rounded-3xl h-48 w-48' />
                            <h3 className='absolute bottom-0 text-center text-white text-lg font-extrabold bg-gradient-to-t from-black to-transparent w-full px-3 py-2 rounded-b-3xl'>
                                {typeChoice.nom}
                            </h3>
                        </div>

                    </div>
                        : <SwiperTest nbSlides={7} types={types} searchByType={searchByType}></SwiperTest>}
                    {selectType ? <div className='flex justify-between items-center w-full'>
                        <p className='text-lg'>{dataPlants.length} produits</p>
                        <div className='flex gap-2 items-center'>
                            <p>Trier par : </p>

                            <select name="triSearch" id="" className='p-2 rounded-lg border'>
                                <option value="1">Meilleurs ventes</option>
                                <option value="2">Alphabétique, de A à Z</option>
                                <option value="3">Alphabétique, de Z à A</option>
                                <option value="4">Prix décroissant</option>
                                <option value="5">Prix croissant</option>
                                <option value="6">Du plus récent au moins récent</option>
                                <option value="7">Du plus ancien au plus récent</option>
                            </select></div>
                    </div>

                        : <p className='text-lg'>{dataPlants.length} produits</p>
                    }
                    <ProductGrid data={dataPlants} />
                </div>
            </div>
        </div>
    );
}

export default Search;
