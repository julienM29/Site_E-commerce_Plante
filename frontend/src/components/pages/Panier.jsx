import React, { useEffect, useState } from 'react';

import ConteneurQuantity from '../shared/QuantityInput';

import Swiper3Plants from '../shared/Swiper3Plants';
function Panier() {
    const [quantityProduct, setQuantityProduct] = useState(0);

    return (
        <>
            <div className="bg-custom-light py-16 min-h-screen w-full flex flex-col items-center gap-10">
                {/* Panier + prix manquant pour livraison gratuite */}
                <div className='flex w-9/12'>
                    <p className='w-1/3 text-6xl font-bold text-gray-700'>Panier</p>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-4 items-center'>
                            <img src="icones/camion_livraison.png" alt="" className='w-12 object-contain'/>
                            <p className='font-semibold text-lg'> Dépensez encore 41.30euros de plus e obtenez la livraison gratuite !</p>
                        </div>
                        <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600'>
                            <div className='bg-emerald-500 h-2.5 rounded-full w-[45%]' ></div>
                             </div>
                    </div>
                </div>
                {/* Les 2 blocs à gauche tableau à droite recap prix etc */}
                <div className='flex gap-4 w-9/12'>
                    {/* Tableau + garanti */}
                    <div className='flex flex-col gap-4 w-2/3'>
                        <div className="p-4 bg-white rounded-2xl border shadow-lg">
                            <table className="w-full border-collapse text-left">
                                <thead className=" border-b border-gray-200 hover:bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-4 py-2 text-xl font-bold text-gray-600 uppercase"
                                        >
                                            Produit
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-2 text-xl font-bold text-gray-600 uppercase"
                                        >
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-2 text-xl font-bold text-gray-600 uppercase"
                                        >
                                            Quantité
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-4 py-2 text-xl font-bold text-gray-600 uppercase"
                                        >
                                            Prix
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className=" hover:bg-gray-50">
                                        <td className="px-4 py-4">
                                            <div className="flex gap-4">
                                                <img
                                                    src="images/plante.png"
                                                    alt=""
                                                    className="w-20 h-20 rounded-md border"
                                                />
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-lg font-medium text-gray-800">
                                                        2 Oenothères roses Siskiyou Pink
                                                    </p>
                                                    <p className="text-base text-gray-500">
                                                        Les 2 pots / 9cm de diamètre
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                                        <img src="icones/verifier_white.png" alt="" className="w-5 h-5" />
                                                        <span>En stock -</span>
                                                        <p className="text-gray-500">Expédition dès demain</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-xl font-medium text-gray-800">5.40 €</td>
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                        <ConteneurQuantity quantityProduct={quantityProduct} heightInput='11' paddingButton='3' setQuantityProduct={setQuantityProduct} />
                                        </td>
                                        <td className="px-4 py-4 text-xl font-medium text-gray-800">22 €</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-4 bg-white flex flex-col justify-center gap-4 rounded-xl shadow-lg ">
                                <h2 className="text-emerald-600 text-2xl font-bold text-center ">
                                    Paiement sécurisé avec
                                </h2>
                                <div className="w-full h-full grid grid-cols-2 justify-center items-center gap-4">
                                    <div className="flex justify-center items-center">
                                        <img
                                            src="icones/logo_cb.jpeg"
                                            alt="Logo CB"
                                            className="w-full h-20 object-contain border border-gray-200 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <img
                                            src="icones/master_card.png"
                                            alt="Logo MasterCard"
                                            className="w-full h-20 object-contain border border-gray-200 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <img
                                            src="icones/visa.png"
                                            alt="Logo Visa"
                                            className="w-full h-20 object-contain border border-gray-200 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <img
                                            src="icones/paypal.png"
                                            alt="Logo Paypal"
                                            className="w-full h-20 object-contain border border-gray-200 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-white flex flex-col justify-center gap-4 rounded-xl shadow-lg ">

                                <div className="w-full flex flex-col gap-2">
                                    <h2 className="text-emerald-600 text-2xl font-bold text-center">
                                        Qualité Kerisnel
                                    </h2>
                                    <p className='text-center text-gray-700'>40 ans d'expertise pour votre jardin</p>
                                </div>
                                <div className="h-full flex justify-center items-center">


                                    <img
                                        src="icones/quality.png"
                                        alt="Logo CB"
                                        className="w-1/2 object-contain "
                                    />
                                </div>
                            </div>
                            <div className="p-4 bg-white flex flex-col justify-center gap-4 rounded-xl shadow-lg ">
                                <h2 className="text-emerald-600 text-2xl font-bold text-center">
                                    Avis clients vérifiés
                                </h2>
                                <div className="w-full flex justify-center items-center h-full">
                                    <img
                                        src="icones/avis_client.jpeg"
                                        alt="Logo CB"
                                        className="w-1/2 object-contain "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 w-1/3'>
                        <div className='px-8 py-6 bg-white rounded-2xl flex flex-col items-center gap-6 border shadow-lg'>
                            <p className='font-semibold text-xl'>Livraison entre le 04/01/2025 et le 09/01/2025</p>
                            <div className='w-full flex justify-between font-semibold text-2xl'>
                                <p className=''>Total</p>
                                <p> 17.97 EUR</p>
                            </div>
                            <p className=''>Livraison 6.90€ (en relais) , offerte dès 59€</p>
                            <button type="submit" className="w-3/4 flex justify-center bg-gradient-to-r from-emerald-600 to-emerald-300 hover:bg-gradient-to-l hover:from-emerald-600 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-semibold text-white rounded-full text-md px-5 py-2.5 text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out">
                                Commander
                            </button>
                        </div>
                        <div className='px-8 py-6 bg-white rounded-2xl flex flex-col items-center gap-6 border shadow-lg '>
                            <div className='flex gap-2 items-center'>
                                <img src="icones/garantie.png" alt="" className='w-24 h-24 ' />
                                <div className='flex flex-col gap-2'>
                                    <div className='flex justify-between'>
                                        <p className='text-xl font-semibold'>Garantie Plant Protect</p>
                                        <p className='text-xl font-semibold text-emerald-600'>3.90€</p>
                                    </div>
                                    <p>Protégez-vous de toute mauvaise surprise lors de la période de reprise végétale.</p>

                                    <a
                                        href="#"
                                        className="text-emerald-600 flex items-center gap-1 underline underline-offset-2 hover:text-emerald-700 focus:text-emerald-800 transition-colors duration-200 ease-in-out"
                                        aria-label="En savoir plus sur [sujet]"
                                    >
                                        En savoir plus
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </a>
                                </div>

                            </div>
                                <button type="submit" className="w-3/4 flex justify-center bg-gradient-to-r from-emerald-600 to-emerald-300 hover:bg-gradient-to-l hover:from-emerald-600 hover:to-emerald-300 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-semibold text-white rounded-full text-md px-5 py-2.5 text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out">
                                    Ajouter
                                </button>                            
                        </div>
                    </div>
                </div>
                <div className='w-3/4 flex flex-col items-center justify-center py-8 gap-12'>
                    <h2 className='text-5xl font-semibold text-gray-700'>Les meilleures ventes </h2>
                    <Swiper3Plants></Swiper3Plants>
                </div>
            </div>
        </>
    )
}

export default Panier;
