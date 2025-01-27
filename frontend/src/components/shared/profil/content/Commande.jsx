import React, { useEffect, useState } from 'react';
const Commande = () => {


    return (
        <div className="w-full  gap-7 flex flex-col items-center px-6 py-8">
            <img src="./icones/colis_vide.png" alt="" className='w-28 h-28'/>
            <p className='font-semibold text-lg'>Découvrez nos produits </p>
            <button className='rounded-lg py-2 px-4 bg-rose-500 text-white'>Voir les produits</button>
        </div>
    );
};

export default Commande;
