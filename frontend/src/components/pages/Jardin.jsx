import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarreLivraisonGratuite from '../shared/BarreLivraisonGratuite';
import ConteneurDetailProduitPanier from '../shared/panier/ConteneurDetailProduitPanier';
import SwiperPromotion from '../shared/SwipperPromotion';
import { getUserInfoAndWishList } from '../shared/UserUtils';
import { searchSelection } from '../shared/loadProduct';
function Jardin() {
    const { panier, total } = useSelector((state) => state.myState);
    const [userID, setUserID] = useState();
    const [dataCookie, setDataCookie] = useState();
    
    useEffect(() => {
        getUserInfoAndWishList(setUserID, setDataCookie);
    }, []);
    return (
        <>
            <div className="bg-custom-light py-16 min-h-screen w-full flex flex-col items-center gap-10">
                {/* Panier + prix manquant pour livraison gratuite */}
                <div className='flex flex-col gap-2 w-9/12'>
                    <p className='w-1/3 text-6xl font-bold text-gray-700'>Panier</p>
                    <div className='w-full flex justify-center '>
                        <div className='w-1/3'>
                            <BarreLivraisonGratuite prixPanier={total}></BarreLivraisonGratuite></div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Jardin;
