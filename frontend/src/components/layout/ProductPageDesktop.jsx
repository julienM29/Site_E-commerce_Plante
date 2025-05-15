import React, { useEffect, useState } from 'react';
import DetailProduit from '../shared/DetailProduit';
import EsthetiqueProduct from '../shared/productPage/EsthetiqueProduct';
import JardinageProduct from '../shared/productPage/JardinageProduct';
import EmplacementProduct from '../shared/productPage/EmplacementProduct';
import { Link } from "react-router-dom";
import SwiperPromotion from '../shared/SwipperPromotion';
import TitreSection from '../shared/homePage/TitreSection';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
const ProductPageDesktop = ({
    dataPlants,
    handleSlideChange,
    tabImages,
    ImgPlants,
    formattedDate,
    userID,
    dataPlantsSuggestions,
    dataCookie,
    swiperRef,
    activeIndex,
    setActiveIndex
}) => {

    return (
        <div className="bg-custom-light py-6 flex flex-col items-center gap-6">
            <div className="w-3/4 flex flex-col items-center gap-4 pb-6">

                <p className="text-left w-4/5 text-gray-500">
                    <Link className=" hover:underline underline-offset-2" to="/">Accueil</Link>
                    <span> / </span>
                    <Link className=" hover:underline underline-offset-2" to="/search">Plantes</Link>
                    <span> / </span>
                    {dataPlants.type && (
                        <>
                            <Link className=" hover:underline underline-offset-2" to={`/search?t=${dataPlants.id_type}`}>{dataPlants.type}</Link>
                            <span> / </span>
                        </>
                    )}
                    <span className="">{dataPlants.famille}</span>
                    <span> / </span>

                    <span className="font-semibold">{dataPlants.nom}</span>
                </p>


                <div className="w-full flex flex-col xl:flex-row justify-center items-start gap-4">
                    <div className="w-3/6 order-1 xl:order-2">
                        <Swiper
                            slidesPerView={1}
                            effect="fade"
                            fadeEffect={{ crossFade: true }}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            modules={[EffectFade]}
                            className="clientSwiper"
                        >
                            {tabImages.map((url, index) => (
                                <SwiperSlide key={index}>
                                    <img src={`/images/${url}`} alt={`Slide ${index + 1}`} className="w-full h-[70vh] object-cover rounded-md cursor-pointer" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="py-1 max-xl:w-full w-1/6 h-full xl:top-0 order-2 xl:order-1 custom-controls flex xl:flex-col justify-start items-end gap-4">
                        {tabImages.map((url, index) => (
                            <ImgPlants
                                key={index}
                                url={url}
                                isActive={activeIndex === index}
                                onClick={() => handleSlideChange(index)}
                            />
                        ))}
                    </div>

                    <DetailProduit
                        nom={dataPlants.nom || 'Nom de la plante'}
                        id={dataPlants.id}
                        nomLatin={dataPlants.nom_latin || 'Nom latin'}
                        promotion={dataPlants.promotion}
                        primaryImage={tabImages[0]}
                        prixInitial={dataPlants.prix || 'Non spécifié'}
                        typePlant={dataPlants.type || 'Type non spécifié'}
                        litrageDisponible={dataPlants.litragesDispo || 'Non spécifié'}
                        dateLivraison={formattedDate}
                        userID={userID}
                    />
                </div>
            </div>
            <div className='bg-white py-6 flex flex-col w-full items-center gap-4 border'>
                <div className='flex w-[60%] flex-col gap-8 '>
                    <h2 className='w-full text-start text-4xl font-semibold text-green-800'>Caractéristiques</h2>
                    <div className='w-full flex divide-x-2'>
                        <EsthetiqueProduct periodeFloraison={dataPlants.periode_floraison}
                            hauteurMin={dataPlants.hauteur_min}
                            hauteurMax={dataPlants.hauteur_max}
                            fleurCouper={dataPlants.fleurs_pour_couper}
                            couleur={dataPlants.couleur}
                            persistant={dataPlants.persistan_feuillage}
                            parfum={dataPlants.parfum}
                            port={dataPlants.port}
                            largeurMin={dataPlants.largeur_maturité_min}
                            largeurMax={dataPlants.largeur_maturité_max}
                            couleurFeuille={dataPlants.couleur_feuilles} />
                        <JardinageProduct
                            rusticite={dataPlants.rusticite}
                            periodePlantation={dataPlants.periode_plantation}
                            culturePotBac={dataPlants.culture_pot_bac}
                            frequenceArrosage={dataPlants.frequence_arrosage}
                            mellifere={dataPlants.mellifere}
                            protectionFroid={dataPlants.protection_froid}
                            vitesseCroissance={dataPlants.vitesse_croissance}
                            distancePlantationMin={dataPlants.distance_plantation_min}
                            distancePlantationMax={dataPlants.distance_plantation_max}
                            precaution={dataPlants.precaution}
                            periodeRecolte={dataPlants.periode_recolte}
                            greffe={dataPlants.greffe} />
                        <EmplacementProduct
                            exposition={dataPlants.exposition}
                            typeSol={dataPlants.type_sols}
                            typeClimat={dataPlants.type_climats}
                            utilisation={dataPlants.utilisation} />
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col items-center gap-6">
                <TitreSection texte="Vous pourriez aussi aimer ceci..." textColor="text-zinc-800" taillePolice="text-3xl" />
                <div className='w-11/12 flex justify-center' id='swipperSuggestion'>
                    <SwiperPromotion nbSlides={4} products={dataPlantsSuggestions} userID={userID} dataCookie={dataCookie}></SwiperPromotion>
                </div>
            </div>
        </div>

    );
};

export default ProductPageDesktop;
