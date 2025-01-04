import React, { useState } from 'react';
import {logoAchicrit} from '../../assets/images'
import ProductGrid from '../shared/ProductGrid';
function Search() {
    // L'état du checkbox
    const [togglePersistantIsChecked, setTogglePersistantIsChecked] = useState(true);
    const [toggleParfumeIsChecked, setToggleParfumeIsChecked] = useState(true);
    const [toggleMellifereIsChecked, setToggleMellifereIsChecked] = useState(true);
    const [toggleBioIsChecked, setToggleBioIsChecked] = useState(true);
    const [toggleVivaceIsChecked, setToggleVivaceIsChecked] = useState(true);

    // Fonction générique pour gérer le changement d'état et appeler une API si nécessaire
    const handleCheckboxChange = async (setter, value, apiEndpoint) => {
        // Changer l'état local
        setter(prevState => !prevState);

        // Appeler une API si nécessaire
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                body: JSON.stringify({ value }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Échec de l\'appel API');
            }

            const data = await response.json();
            console.log('Réponse API:', data);

        } catch (error) {
            console.error('Erreur API:', error);
        }
    };
    return (
        <div className="bg-custom-light py-4 min-h-screen flex flex-col items-center gap-6">
            <div className='w-9/12 flex gap-6'>
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
                        <li className='flex gap-2'> Plante parfumée
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer focus:outline-none focus:ring-0"
                                    checked={toggleParfumeIsChecked}
                                    onChange={() => handleChange(setToggleParfumeIsChecked)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </li>
                        <li className='flex gap-2'> Mellifère
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer focus:outline-none focus:ring-0"
                                    checked={toggleMellifereIsChecked}
                                    onChange={() => handleChange(setToggleMellifereIsChecked)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </li>
                        <li> Arrosage</li>
                        <li className='flex gap-2'> Bio
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer focus:outline-none focus:ring-0"
                                    checked={toggleBioIsChecked}
                                    onChange={() => handleChange(setToggleBioIsChecked)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </li>
                        <li> Emplacement</li>
                        <li> Mois de floraison</li>
                        <li> Mois de récolte</li>
                        <li className='flex gap-2'> Vivace
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer focus:outline-none focus:ring-0"
                                    checked={toggleVivaceIsChecked}
                                    onChange={() => handleChange(setToggleVivaceIsChecked)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className='w-5/6 flex flex-col gap-4'>
                    <div className='flex gap-2'>
                        <img src={logoAchicrit} alt="" className='w-40 h-40 rounded-3xl '/>
                        <img src={logoAchicrit} alt="" className='w-40 h-40 rounded-3xl '/>
                        <img src={logoAchicrit} alt="" className='w-40 h-40 rounded-3xl '/>
                        <img src={logoAchicrit} alt="" className='w-40 h-40 rounded-3xl '/>
                        <img src={logoAchicrit} alt="" className='w-40 h-40 rounded-3xl '/>
                        <img src={logoAchicrit} alt="" className='w-40 h-40 rounded-3xl '/>
                        <img src={logoAchicrit} alt="" className='w-40 h-40 rounded-3xl '/>  
                    </div>
                    <p>600 produits</p>
                    <ProductGrid></ProductGrid>
                </div>
            </div>
        </div>
    );
}

export default Search;
