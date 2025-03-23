import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ConteneurPlant from './ConteneurPlant';

const SwiperPromotion = ({ nbSlides, products, userID, dataCookie }) => {

    return (
        <div className='flex justify-center w-5/6'>
            
            <Swiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={nbSlides}
                navigation
                onSlideChange={(swiper) => {
                    const slides = swiper.slides;
                    requestAnimationFrame(() => {
                        slides.forEach((slide, index) => {
                            if (index >= swiper.activeIndex && index < swiper.activeIndex + 4) {
                                slide.classList.add('slide-visible'); // Ajouter une classe pour les slides visibles
                            } else {
                                slide.classList.remove('slide-visible'); // Optionnel : retirer la classe des slides non visibles
                            }
                        });
                    });
                }}

                onInit={(swiper) => {
                    // Ajouter la classe à toutes les slides dès l'initialisation
                    swiper.slides.forEach((slide) => {
                        slide.classList.add('slide-visible');
                    });
                }}
                className="my-custom-swiper overflow-visible relative"
            >
                {products.map((plant, index) => (
                    
                    <SwiperSlide key={index}> <ConteneurPlant
                    taille={'11/12'}
                    id={plant.id}
                    primaryImage={`/images/${plant.images[0]}`}
                    secondaryImage={`/images/${plant.images[1]}`}
                    altPrimary="photo 1 de la plante"
                    altSecondary="photo 2 de la plante"
                    nom={plant.nom}
                    descriptionRapide={plant.famille}
                    prixInitial={plant.prix}
                    reduction={plant.promotion || null}
                    infoStock="disponible"
                    idUser={userID}
                    isWishlisted={dataCookie?.includes(plant.id)}
                    hauteur = {500}
                  /> </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
};

export default SwiperPromotion;
