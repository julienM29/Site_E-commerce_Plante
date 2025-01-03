import React, { useState, useCallback } from 'react';
import { logoCamionLivraison } from '../../assets/icones';

const BarreLivraisonGratuite = ({ prixPanier }) => {
    const [prixLivraisonGratuit, setPrixLivraisonGratuit] = useState(60 - Number(prixPanier));


    return (
        <div className='flex flex-col gap-2'>
                                <div className='flex gap-4 items-center'>
                                    <img src={logoCamionLivraison} alt="" className='w-12 object-contain'/>
                                    <p className=' text-center'> Dépensez encore {prixLivraisonGratuit} € de plus et obtenez la livraison gratuite !</p>
                                </div>
                                <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600'>
                                    <div className='bg-emerald-500 h-2.5 rounded-full w-[45%]' ></div>
                                     </div>
                            </div>
    );
};

export default BarreLivraisonGratuite;
