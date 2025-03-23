import React, { useState, useEffect } from 'react';
import ProductGrid from '../shared/ProductGrid';
import SwiperTest from '../shared/SwiperTest';
import FilterBar from '../shared/FilterBar';
import { useSearchParams } from "react-router-dom";
import { OrbitProgress } from 'react-loading-indicators';
function Search() {
    const [selectType, setSelectType] = useState(false);

    const [types, setTypes] = useState([]);
    const [dataPlants, setDataPlants] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";
    const typeSearchQuery = searchParams.get("t") || "";
    const promotionSearchQuery = searchParams.get("p") || "";
    const [loading, setLoading] = useState(false); // 🔥 État de chargement
    const selectedColor = searchParams.get("color") || null;
    const [typeChoice, setTypeChoice] = useState();
    const [filters, setFilters] = useState({
        text: searchQuery || null,
        color: null,
        minPrice: null,
        maxPrice: null,
        exposition: null,
        arrosage: null,
        emplacement: null,
        floraison: null,
        recolte: null,
        persistant: null,
        type: null,
        promotion: null,
    });
    const [initialized, setInitialized] = useState(false); // Nouveau état pour vérifier l'initialisation
    const [productFound, setProductFound] = useState(false); // Nouveau état pour vérifier l'initialisation

    const loadTypesPlant = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/loadType');
            const data = await response.json();
            setTypes(data.types || []);
        } catch (error) {
            console.error('Erreur lors du chargement des types:', error);
        }
    };

    const searchByType = async (id, nom, image) => {
        try {
            const updatedParams = new URLSearchParams(searchParams);
            setLoading(true);
            if (typeChoice && typeChoice.id === id) {            
                updatedParams.delete("t");
                // Si on reclique sur le même type, on désélectionne
                setSelectType(false);
                setTypeChoice(null);
                setFilters((prevState) => ({
                    ...prevState,
                    type: null,
                }));
            } else {
                updatedParams.set("t", id); // Ajoute le paramètre `t`
                setSelectType(true);
                setTypeChoice({ nom, id, image });
                setFilters((prevState) => ({
                    ...prevState,
                    type: id,
                }));
            }
            setSearchParams(updatedParams);
        } catch (error) {
            console.error('Erreur lors du chargement des plantes:', error);
            setDataPlants([]);
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    };
    
    const searchByText = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/searchByText/${searchQuery}`, { method: "POST", credentials: "include" });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setDataPlants(data.products || []);
        } catch (error) {
            console.error('Erreur lors du chargement des plantes:', error);
        } finally {
            setTimeout(() => setLoading(false), 650);
        }
    };
    const searchByParams = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/searchByParams`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filters), // Corps dynamique basé sur les filtres
                credentials: "include"
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setDataPlants(data.products || []);
            if (data.products.length > 0) {
                setProductFound(true)
            } else {
                setProductFound(false)
                console.log('date null normalement : ', data.products)
            }
        } catch (error) {
            console.error('Erreur lors du chargement des plantes:', error);
        } finally {
            setTimeout(() => setLoading(false), 650);
        }
    };

    useEffect(() => {
        if (searchQuery) { // Vérifie que searchQuery n'est pas vide ou null
            searchByText();
        }
    }, [searchQuery]);
    useEffect(() => {
        if (promotionSearchQuery) { 
            setFilters((prevState) => ({
                ...prevState,
                promotion: true,
            }));
        }
    }, [promotionSearchQuery]);
    
    
    
    useEffect(() => {
        loadTypesPlant();
        // console.log('change filters :', filters);
        searchByParams(); // Appel de la fonction de recherche avec les filtres mis à jour
    }, [filters]);
    useEffect(() => {
        if (typeSearchQuery && types.length > 0) {  // Vérifie si les types sont chargés
            // Si typeSearchQuery est déjà pris en compte, on n'effectue pas l'appel à searchByType
            const idTabType = parseInt(typeSearchQuery, 10) - 1;  // Convertir typeSearchQuery en nombre
            if (idTabType >= 0 && idTabType < types.length) {
                const typeTab = types[idTabType];
                if (typeChoice && typeChoice.id === typeTab.id) {
                    return;  // Si le type est déjà sélectionné, on ne refait pas l'appel
                }
                console.log('typeTab : ', typeTab);
                searchByType(typeTab.id, typeTab.nom, typeTab.image); // Recherche par type
            } else {
                console.error('Index invalide pour le type :', idTabType);
            }
        }
    }, [typeSearchQuery, types]);  // Ajout de `types` dans les dépendances pour éviter les boucles infinies
    
    const resetFilters = () => {
        setFilters({
            text: null,
            color: null,
            minPrice: null,
            maxPrice: null,
            exposition: null,
            arrosage: null,
            emplacement: null,
            floraison: null,
            recolte: null,
            persistant: null,
            type: null,
            promotion: null,
        });
    };
    return (
        <div className="bg-custom-light py-6 min-h-screen flex flex-col items-center gap-6">
            <div className="w-10/12 flex gap-10">
                <FilterBar setFilters={setFilters} filters={filters} />
                <div className="w-4/5 flex flex-col gap-4 flex-grow">
                    {loading ? (
                        <div className="h-screen flex justify-center items-center ">
                            <OrbitProgress color="#32cd32" size="large" text="" textColor="" />
                        </div>
                    ) : (
                        <>
                            {!productFound ? (
                                <div className="h-3/4 flex justify-center items-center animate-fadeIn">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        {/* Icône illustrative */}
                                        <img className="w-28 h-28 text-gray-400" src="/icones/product_not_found.png" alt="" />

                                        {/* Message principal */}
                                        <p className="text-3xl font-semibold text-gray-800">Aucun produit trouvé</p>
                                        <p className="text-gray-600 text-xl">Désolé, nous n'avons trouvé aucun résultat. Essayez avec d'autres filtres !</p>

                                        {/* Bouton avec effet d'ombre */}
                                        <button onClick={resetFilters} className="mt-4 rounded-3xl text-2xl px-6 py-3 bg-emerald-800 text-white font-bold transition-transform transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl">
                                            Réinitialiser les filtres
                                        </button>
                                    </div>
                                </div>


                            ) : (
                                <>
                                    {selectType ? (
                                        <div className="flex justify-between w-full">
                                            <SwiperTest nbSlides={7} types={types} searchByType={searchByType} typeChoice={typeChoice} />
                                        </div>
                                    ) : (
                                        <SwiperTest nbSlides={7} types={types} searchByType={searchByType} />
                                    )}
                                    {selectType ? (
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-lg">{dataPlants.length} produits</p>
                                            <div className="flex gap-2 items-center">
                                                <p>Trier par :</p>
                                                <select name="triSearch" className="p-2 rounded-lg border">
                                                    <option value="1">Meilleurs ventes</option>
                                                    <option value="2">Alphabétique, de A à Z</option>
                                                    <option value="3">Alphabétique, de Z à A</option>
                                                    <option value="4">Prix décroissant</option>
                                                    <option value="5">Prix croissant</option>
                                                    <option value="6">Du plus récent au moins récent</option>
                                                    <option value="7">Du plus ancien au plus récent</option>
                                                </select>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-lg">{dataPlants.length} produits</p>
                                    )}

                                    <ProductGrid data={dataPlants} /> </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
