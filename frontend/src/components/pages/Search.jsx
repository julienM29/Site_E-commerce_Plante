import React, { useState, useEffect } from 'react';
import ProductGrid from '../shared/ProductGrid';
import SwiperTest from '../shared/SwiperTest';
import FilterBar from '../shared/FilterBar';
function Search() {

    const [types, setTypes] = useState([]);
    const [dataPlants, setDataPlants] = useState([]); // Toujours initialiser en tableau
    
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

    useEffect(() => {
        loadTypesPlant();
        loadPlants();
    }, []);


    return (
        <div className="bg-custom-light py-6 min-h-screen flex flex-col items-center gap-6">
            <div className='w-10/12 flex gap-10'>
                <FilterBar />
                <div className='w-4/5 flex flex-col gap-4'>
                    <SwiperTest nbSlides={7} types={types}></SwiperTest>
                    <p>600 produits</p>
                    <ProductGrid data={dataPlants} />
                </div>
            </div>
        </div>
    );
}

export default Search;
