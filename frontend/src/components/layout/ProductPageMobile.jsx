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
const ProductPageMobile = ({
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
    setActiveIndex,
    isMobile
}) => {

    return (
        <div className="bg-custom-light py-4 px-4 flex flex-col gap-6">
            {/* Fil d’Ariane simplifié */}
            <p className="text-sm text-gray-500">
                <Link className="underline underline-offset-2" to="/">Accueil</Link>
                <span> / </span>
                <Link className="underline underline-offset-2" to="/search">Plantes</Link>
                <span> / </span>
                {dataPlants.type && (
                    <>
                        <Link className="underline underline-offset-2" to={`/search?t=${dataPlants.id_type}`}>{dataPlants.type}</Link>
                        <span> / </span>
                    </>
                )}
                <span className="font-semibold">{dataPlants.nom}</span>
            </p>
            <div className="w-full flex flex-col xl:flex-row justify-center items-start gap-4">
            {/* Swiper principal */}
            <Swiper
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                modules={[EffectFade]}
                className="w-full"
            >
                {tabImages.map((url, index) => (
                    <SwiperSlide key={index}>
                        <img src={`/images/${url}`} alt={`Slide ${index + 1}`} className="w-full h-64 object-cover rounded-md" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Miniatures en horizontal */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {tabImages.map((url, index) => (
                    <ImgPlants
                        key={index}
                        url={url}
                        isActive={activeIndex === index}
                        onClick={() => handleSlideChange(index)}
                    />
                ))}
            </div>

            {/* Détails produit */}
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
            {/* Caractéristiques : format accordéon ou sections empilées */}
            <div className="bg-white py-4 px-4 rounded-md shadow-sm flex flex-col md:gap-6">
                <h2 className="text-xl font-semibold text-green-800">Caractéristiques</h2>

                <div className="flex flex-col divide-y">
                    <div className="md:pt-4 max-md:py-4">
                        <EsthetiqueProduct
                            periodeFloraison={dataPlants.periode_floraison}
                            hauteurMin={dataPlants.hauteur_min}
                            hauteurMax={dataPlants.hauteur_max}
                            fleurCouper={dataPlants.fleurs_pour_couper}
                            couleur={dataPlants.couleur}
                            persistant={dataPlants.persistan_feuillage}
                            parfum={dataPlants.parfum}
                            port={dataPlants.port}
                            largeurMin={dataPlants.largeur_maturité_min}
                            largeurMax={dataPlants.largeur_maturité_max}
                            couleurFeuille={dataPlants.couleur_feuilles}
                        />
                    </div>
                    <div className="md:pt-4 max-md:py-4">
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
                            greffe={dataPlants.greffe}
                        />
                    </div>
                    <div className="md:pt-4 max-md:py-4">
                        <EmplacementProduct
                            exposition={dataPlants.exposition}
                            typeSol={dataPlants.type_sols}
                            typeClimat={dataPlants.type_climats}
                            utilisation={dataPlants.utilisation}
                        />
                    </div>
                </div>
            </div>

            {/* Suggestions produits */}
            <div className="flex flex-col items-center gap-4">
                <TitreSection texte="Vous pourriez aussi aimer ceci..." textColor="text-zinc-800" taillePolice="text-xl" />
                <div className="w-full" id='swipperSuggestion'>
                    <SwiperPromotion nbSlides={1} products={dataPlantsSuggestions} userID={userID} dataCookie={dataCookie} />
                </div>
            </div>
        </div>
    );


};

export default ProductPageMobile
