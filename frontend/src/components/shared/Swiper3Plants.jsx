import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ConteneurPlant from './ConteneurPlant';

const Swiper3Plants = ({}) => {
    return (
        <div className='flex justify-center w-5/6'>
            <Swiper
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={4}
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
              <SwiperSlide> <ConteneurPlant
                taille={'11/12'}
                primaryImage="/images/plante.png"
                secondaryImage="/images/plant2.jpeg"
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="En stock"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                taille={'11/12'}
                primaryImage="/images/plante.png"
                secondaryImage="/images/plant2.jpeg"
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="En stock"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                taille={'11/12'}
                primaryImage="/images/plante.png"
                secondaryImage="/images/plant2.jpeg"
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="En stock"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                taille={'11/12'}
                primaryImage="/images/plante.png"
                secondaryImage="/images/plant2.jpeg"
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="En stock"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                taille={'11/12'}
                primaryImage="/images/plante.png"
                secondaryImage="/images/plant2.jpeg"
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="En stock"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                taille={'11/12'}
                primaryImage="/images/plante.png"
                secondaryImage="/images/plant2.jpeg"
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="En stock"
              /> </SwiperSlide>
            </Swiper>
          </div>
      );
};

export default Swiper3Plants;
