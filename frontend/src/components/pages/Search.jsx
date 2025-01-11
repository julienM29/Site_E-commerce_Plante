import React, { useState, useEffect } from 'react';
import ProductGrid from '../shared/ProductGrid';
import { arbre, arbustes, bulbe, fruitiers, grimpante, plante_annuelle, plante_aquatique, plante_interieur, plantes_vivaces, rosiers } from '../../assets/images';
import SwiperTest from '../shared/SwiperTest';
function Search() {
    // L'état du checkbox
    const [togglePersistantIsChecked, setTogglePersistantIsChecked] = useState(true);
    const [toggleParfumeIsChecked, setToggleParfumeIsChecked] = useState(true);
    const [toggleMellifereIsChecked, setToggleMellifereIsChecked] = useState(true);
    const [toggleBioIsChecked, setToggleBioIsChecked] = useState(true);
    const [toggleVivaceIsChecked, setToggleVivaceIsChecked] = useState(true);
    const [types, setTypes] = useState([]);

    const handleChange = (setState) => {
        setState((prev) => !prev); // Inverse l'état du checkbox (true/false)
    };
    
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

   

    useEffect(() => {
        loadTypesPlant();
    }, []);

    return (
        <div className="bg-custom-light py-10 min-h-screen flex flex-col items-center gap-6">
            <div className='w-10/12 flex gap-10'>
                <div className='w-1/6 h-[90vh] flex flex-col p-1 rounded-xl bg-white shadow-lg'>
                    <p className='text-rose-700 text-3xl font-semibold pb-4 border-b-4'>Filtre</p>
                    <ul>
                        <li> Prix</li>
                        <li> Couleur</li>
                        <li> Exposition</li>
                        <li className='flex gap-2'> Feuillage persistant
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer focus:outline-none focus:ring-0"
                                    checked={togglePersistantIsChecked}
                                    onChange={() => handleChange(setTogglePersistantIsChecked)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-0 peer-focus:outline-none peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </li>
                        {/* Ajoute d'autres cases à cocher ici */}
                    </ul>
                </div>

                <div className='w-5/6 flex flex-col gap-4'>
                    <SwiperTest nbSlides={7} types={types}></SwiperTest>

                    <p>600 produits</p>
                    <ProductGrid />
                </div>
            </div>
        </div>
    );
}

export default Search;
