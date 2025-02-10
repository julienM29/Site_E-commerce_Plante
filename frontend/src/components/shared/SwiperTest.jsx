import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SwiperTest = ({ nbSlides, types, searchByType, typeChoice }) => {
    return (
        <div className='flex justify-center w-full'>
            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={nbSlides}
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
                {types && types.length > 0 ? (
                    types.map((type, index) => (
                        <SwiperSlide key={index}>

                            <button className={`relative flex justify-center border rounded-3xl overflow-hidden `}
                            onClick={() => searchByType(type.id, type.nom, type.image)}> 
                                <img src={`/images/${type.image}`} alt="test" className={`object-cover rounded-3xl h-48 w-48 ${typeChoice && typeChoice.id === (Number(index)+1 )? " border-4 border-green-500" : ""}`} />
                                <h3 className='absolute bottom-0 text-center text-white text-lg font-extrabold bg-gradient-to-t from-black to-transparent w-full px-3 py-2 rounded-b-3xl'>
                                    {type.nom}
                                </h3>
                            </button>
                        </SwiperSlide>
                    ))
                ) : ( <p>Aucun type disponible</p> )}
            </Swiper>
        </div>
    );
};

export default SwiperTest;
