import React, { useState, useEffect } from 'react';
import ProductGrid from '../shared/ProductGrid';
import SwiperTest from '../shared/SwiperTest';
import FilterBar from '../shared/FilterBar';
import { useSearchParams } from "react-router-dom";
import { OrbitProgress } from 'react-loading-indicators';
function Search() {
    const [selectType, setSelectType] = useState(false);
    const [typeChoice, setTypeChoice] = useState();
    const [types, setTypes] = useState([]);
    const [dataPlants, setDataPlants] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";
    const [loading, setLoading] = useState(false); // 🔥 État de chargement
    const selectedColor = searchParams.get("color") || null;
    const [filters, setFilters] = useState({
        text: searchQuery || null,
        color: null,
        priceRange: null,
    });
    const [initialized, setInitialized] = useState(false); // Nouveau état pour vérifier l'initialisation

    const loadTypesPlant = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/loadType');
            const data = await response.json();
            setTypes(data.types || []);
        } catch (error) {
            console.error('Erreur lors du chargement des types:', error);
        }
    };

    const loadPlants = async () => {
        try {
            setLoading(true); // Démarrer le loader
            const response = await fetch('http://127.0.0.1:3000/loadAllProduct');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setDataPlants(Array.isArray(data.product) ? data.product : []);
        } catch (error) {
            console.error('Erreur lors du chargement des plantes:', error);
            setDataPlants([]);
        } finally {
            setTimeout(() => setLoading(false), 800); // Arrêter le loader après 500ms
        }
    };

    const searchByType = async (id, nom, image) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/productByType/${id}`, { method: "POST", credentials: "include" });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setSelectType(true);
            setTypeChoice({ nom, id, image });
            setDataPlants(Array.isArray(data.products) ? data.products : []);
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
            setTimeout(() => setLoading(false), 800);
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
        } catch (error) {
            console.error('Erreur lors du chargement des plantes:', error);
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    };
    
    useEffect(() => {
        loadTypesPlant();
        if (!searchQuery) {
            loadPlants();
        }
    }, []);

    useEffect(() => {
        searchByText();

    }, [searchQuery]);
    
    useEffect(() => {
        // Si le composant n'est pas encore initialisé, on ne fait rien
        if (!initialized) {
            setInitialized(true);
            return; // Ne pas exécuter l'effet pendant le premier rendu
        }

        // Si on arrive ici, cela signifie que les `filters` ont changé
        console.log('Les filters ont changé:', filters);
        searchByParams(filters); // Appel de la fonction de recherche avec les filtres mis à jour
    }, [filters]); 
    return (
        <div className="bg-custom-light py-6 min-h-screen flex flex-col items-center gap-6">
            <div className="w-10/12 flex gap-10">
            <FilterBar setFilters={setFilters} filters={filters} />
            <div className="w-4/5 flex flex-col gap-4 flex-grow">
                    {loading ? (
                        <div className="h-screen flex justify-center items-center">
                            <OrbitProgress color="#32cd32" size="large" text="" textColor="" />
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
                            <ProductGrid data={dataPlants} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Search;
