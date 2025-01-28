import React, { useEffect, useState } from 'react';
 
const ListeEnvie = () => {
    

    
    


    return (
        <div className="w-full  gap-7 flex flex-col items-center px-6 py-8">
            <img src="./icones/panier_coeur.png" alt=""  className='w-28 h-28'/>
            <p>Votre liste d'envies est vide...</p>
            <p className='text-center font-semibold'>Vous pouvez ajouter des articles dans votre liste d'envies et les commandes plus tard !</p>
            <button className='rounded-lg py-2 px-4 bg-rose-500 text-white'>Voir les produits</button>

           
        </div>
    );

};

export default ListeEnvie;
