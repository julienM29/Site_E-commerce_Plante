import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { arbre, arbustes, bulbe, fruitiers, grimpante, plante_annuelle, plante_aquatique, plante_interieur, plantes_vivaces, rosiers } from '../../assets/images';

// Assure-toi d'avoir la fonction getImage importée ou définie correctement
const getImage = (imageName) => {
    switch (imageName) {
        case 'arbustes.avif':
            return arbustes;
        case 'plantes_vivaces.webp':
            return plantes_vivaces;
        case 'bulbe.webp':
            return bulbe;
        case 'fruitiers.avif':
            return fruitiers;
        case 'grimpantes.webp':
            return grimpante;
        case 'plantes_aquatiques.avif':
            return plante_aquatique;
        case 'plantes_annuelle.webp':
            return plante_annuelle;
        case 'plantes_interieur.avif':
            return plante_interieur;
        case 'rosiers.avif':
            return rosiers;
        case 'arbre.avif':
            return arbre;
        default:
            return null; // Si l'image n'est pas trouvée
    }
};

const SwiperTest = ({ nbSlides, types }) => {
    return (
        <div className='flex justify-center w-full'>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
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
                            <div className='relative object-cover flex justify-center border rounded-2xl'>
                                <img src={getImage(type.image)} alt="" className='rounded-2xl h-30 w-30' />
                                <h3 className='w-full absolute bottom-1 text-center text-white text-lg font-extrabold bg-black bg-opacity-50 px-3 py-1 rounded-md'>
                                    {type.nom}
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <p>Aucun type disponible</p>
                )}
            </Swiper>
        </div>
    );
};

export default SwiperTest;
