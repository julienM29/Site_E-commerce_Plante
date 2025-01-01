import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ConteneurPlant from './ConteneurPlant';
import logoPlant from '../assets/images/laf_111580_1_1000x.webp';
import logoPlant2 from '../assets/images/ACHICRIT1.jpg';

const Swiper3Plants = ({}) => {
    return (
        <div className='flex justify-center w-5/6'>
            <Swiper
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={3}
              navigation
              onSlideChange={(swiper) => {
                const slides = swiper.slides;
                requestAnimationFrame(() => {
                  slides.forEach((slide, index) => {
                    if (index >= swiper.activeIndex && index < swiper.activeIndex + 3) {
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
                primaryImage={logoPlant}
                secondaryImage={logoPlant2}
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="disponible"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                primaryImage={logoPlant}
                secondaryImage={logoPlant2}
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="disponible"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                primaryImage={logoPlant}
                secondaryImage={logoPlant2}
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="disponible"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                primaryImage={logoPlant}
                secondaryImage={logoPlant2}
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="disponible"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                primaryImage={logoPlant}
                secondaryImage={logoPlant2}
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="disponible"
              /> </SwiperSlide>
              <SwiperSlide> <ConteneurPlant
                primaryImage={logoPlant}
                secondaryImage={logoPlant2}
                altPrimary="Plante verte"
                altSecondary="Plante en floraison"
                nom="étoiles bleues tapissantes"
                descriptionRapide="couvre-sol efficace" 
                prixInitial="12.50" 
                prixReduit="0" 
                reduction="0" 
                infoStock="disponible"
              /> </SwiperSlide>
            </Swiper>
          </div>
      );
};

export default Swiper3Plants;
