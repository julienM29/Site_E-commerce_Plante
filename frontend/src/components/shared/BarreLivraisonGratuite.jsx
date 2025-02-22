import React, { useState, useMemo } from 'react';

const BarreLivraisonGratuite = ({ prixPanier }) => {
    // Calculs optimisés avec useMemo pour éviter des recalculs inutiles à chaque rendu
    const prixLivraisonGratuit = useMemo(() => Math.round((60 - prixPanier) * 100) / 100, [prixPanier]);
    const pourcentagePrixLivraisonGratuite = useMemo(() => Math.round((prixPanier / 60) * 100), [prixPanier]);

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-4 items-center'>
                <img src="icones/camion_livraison.png" alt="Livraison" className='w-12 object-contain' />
                <p className=' text-center'>
                    Dépensez encore {prixLivraisonGratuit} € de plus et obtenez la livraison gratuite !
                </p>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600'>
                <div 
                    className={`bg-emerald-500 h-2.5 rounded-full`} 
                    style={{ width: `${pourcentagePrixLivraisonGratuite}%` }} // Calcul dynamique du pourcentage
                ></div>
            </div>
        </div>
    );
};

export default BarreLivraisonGratuite;
