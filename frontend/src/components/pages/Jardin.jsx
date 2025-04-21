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
                <h1 className='text-3xl'>Comment aménager son jardin ?</h1>
                <img src="/images/jardin.jpg" alt="" className='w-full' />

                <div className='flex flex-col gap-2 w-4/6 text-left'>
                    <p className='text-green-800 text-3xl font-bold'>Introduction</p>
                    <div className='flex gap-4 w-full'>
                        <p className='w-2/3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quia nesciunt possimus tempore necessitatibus modi ab nisi iste laborum neque autem eius, perspiciatis corporis, cupiditate consequatur incidunt dolor quas at!</p>
                        <div className='w-1/3 bg-green-300/40 flex flex-col gap-2 items-center py-4 rounded-lg'>
                            <h2 className='w-3/4 font-bold text-lg'>Un jardin à votre image</h2>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Détente</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Potager</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Jeux pour enfants</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Espace convivial</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='w-4/6 '/>
                <div className='flex flex-col gap-2 w-4/6 text-left'>
                    <p className='text-green-800 text-3xl font-bold'>Choisir les bonnes plantes</p>
                    <div className='flex gap-4 w-full'>
                        <p className='w-2/3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quia nesciunt possimus tempore necessitatibus modi ab nisi iste laborum neque autem eius, perspiciatis corporis, cupiditate consequatur incidunt dolor quas at!</p>
                        <div className='w-1/3 bg-green-300/40 flex flex-col gap-2 items-center py-4 rounded-lg'>
                            <h2 className='w-3/4 font-bold text-lg'>Un jardin à votre image</h2>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Détente</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Potager</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Jeux pour enfants</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Espace convivial</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-4/6 text-left'>
                    <p className='text-green-800 text-3xl font-bold'>Organisation de l'espace</p>
                    <div className='flex gap-4 w-full'>
                        <p className='w-2/3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quia nesciunt possimus tempore necessitatibus modi ab nisi iste laborum neque autem eius, perspiciatis corporis, cupiditate consequatur incidunt dolor quas at!</p>
                        <div className='w-1/3 bg-green-300/40 flex flex-col gap-2 items-center py-4 rounded-lg'>
                            <h2 className='w-3/4 font-bold text-lg'>Un jardin à votre image</h2>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Détente</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Potager</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Jeux pour enfants</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Espace convivial</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-4/6 text-left'>
                    <p className='text-green-800 text-3xl font-bold'>Nos plantes coup de coeur</p>
                    <div className='flex gap-4 w-full'>
                        <p className='w-2/3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quia nesciunt possimus tempore necessitatibus modi ab nisi iste laborum neque autem eius, perspiciatis corporis, cupiditate consequatur incidunt dolor quas at!</p>
                        <div className='w-1/3 bg-green-300/40 flex flex-col gap-2 items-center py-4 rounded-lg'>
                            <h2 className='w-3/4 font-bold text-lg'>Un jardin à votre image</h2>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Détente</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Potager</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Jeux pour enfants</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Espace convivial</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-4/6 text-left'>
                    <p className='text-green-800 text-3xl font-bold'>élément déco et mobilier</p>
                    <div className='flex gap-4 w-full'>
                        <p className='w-2/3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quia nesciunt possimus tempore necessitatibus modi ab nisi iste laborum neque autem eius, perspiciatis corporis, cupiditate consequatur incidunt dolor quas at!</p>
                        <div className='w-1/3 bg-green-300/40 flex flex-col gap-2 items-center py-4 rounded-lg'>
                            <h2 className='w-3/4 font-bold text-lg'>Un jardin à votre image</h2>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Détente</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Potager</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Jeux pour enfants</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Espace convivial</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-4/6 text-left'>
                    <p className='text-green-800 text-3xl font-bold'>Conseils pratiques</p>
                    <div className='flex gap-4 w-full'>
                        <p className='w-2/3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quia nesciunt possimus tempore necessitatibus modi ab nisi iste laborum neque autem eius, perspiciatis corporis, cupiditate consequatur incidunt dolor quas at!</p>
                        <div className='w-1/3 bg-green-300/40 flex flex-col gap-2 items-center py-4 rounded-lg'>
                            <h2 className='w-3/4 font-bold text-lg'>Un jardin à votre image</h2>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Détente</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Potager</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Jeux pour enfants</span>
                            </div>
                            <div className='flex gap-2 w-3/4 items-center'>
                                <img src="/icones/verifier_white.png" alt="" className='w-5 h-5' />
                                <span className='font-semibold'>Espace convivial</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Jardin;
