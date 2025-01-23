import React, { useState, useEffect } from 'react';
import ProductGrid from '../shared/ProductGrid';
import SwiperTest from '../shared/SwiperTest';
import FilterBar from '../shared/FilterBar';
function Search() {

    const [types, setTypes] = useState([]);
    const [dataPlants, setDataPlants] = useState([]);

    const loadTypesPlant = async () => {
        const response = await fetch('http://127.0.0.1:3000/loadType', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Spécifie que les données sont en JSON
            },
        });

        const data = await response.json();
        // Mise à jour de l'état avec les types récupérés
        setTypes(data.types || []);  // Assure-toi que 'types' est dans la réponse
    };
    const loadPlants = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/loadProduct', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setDataPlants(data.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
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
                    <ProductGrid data={dataPlants}/>
                </div>
            </div>
        </div>
    );
}

export default Search;
