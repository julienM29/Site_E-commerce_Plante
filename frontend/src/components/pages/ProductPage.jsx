import React, { useState, useRef } from 'react';
import ConteneurQuantity from '../shared/QuantityInput';

import Swiper3Plants from '../shared/Swiper3Plants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import CaracteristiqueProduit from '../shared/CaracteristiqueProduit';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/effect-fade";


function ProductPage() {
  const [activeIndex, setActiveIndex] = useState(0); // Suivre l'index actif
  const [quantityProduct, setQuantityProduct] = useState(0);

  const swiperRef = useRef(null);

  const handleSlideChange = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Change la slide via Swiper
      setActiveIndex(index); // Met à jour l'index actif
    }
  };

  const images = [
    "/images/plante.png","/images/plant2.jpeg","/images/plante.png",
  ];
  const ImgPlants = ({ imgSrc, isActive, onClick }) => {
    return (
      <div
        className={`custom-control border-2 border-black transition ease-in-out hover:scale-110 duration-300 w-20 h-20 overflow-hidden cursor-pointer hover:border-emerald-700 hover:border-4`}
        onClick={onClick}
      >
        <img src={imgSrc} alt="Thumbnail" className="w-full h-full object-cover" />
      </div>
    )
  };
  const DetailProduct = ({ nom, nomLatin, reduction, prixInitial, prixReduit, typePlant, litrageDisponible }) => {
    return (
      <div className="flex h-full w-2/3 flex-col gap-6 order-3">
        {/* Nom du plant */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-5xl font-semibold'>2 {nom}</h2>
          <p className="italic font-semibold text-xl"> {nomLatin}</p>
        </div>
        {/* Prix du plant */}
        <div className='flex flex-col gap-2'>
          <div className="flex justify-between items-center">
            {/* Badge de réduction */}
            <p className="bg-red-700 py-1 px-2 text-white font-semibold text-xl w-fit rounded-md">
              -{reduction}
            </p>
            {/* Prix */}
            <div className="flex flex-col items-end gap-2">
              <p className="text-red-700 font-semibold text-3xl">{prixReduit}€</p>
              <p className="font-semibold text-xl">
                <del>{prixInitial}€</del>
              </p>
            </div>
          </div>
          <p className="bg-emerald-600 text-white py-2 px-5 w-fit font-semibold text-lg rounded-lg">{typePlant}</p>
        </div>
        {/* Format des plants + form */}
        <div className='flex flex-col gap-4'>

          <p className="italic font-semibold text-xl"> Faites votre sélection</p>
          <div className='border rounded-2xl py-4 px-6 flex justify-between bg-white'>
            <div className='flex flex-col gap-2'>
              <p> Taille disponible : pots de {litrageDisponible} p cm de diamètre</p>
              <p className="text-red-700 font-semibold text-xl">{prixReduit}</p>
            </div>
            <div className='flex flex-col gap-'>
              <p className='flex gap-2'>
                <img src="/icones/verifier.png" alt="" className='w-6 h-6' />
                <span>En stock</span>
              </p>
              <p>Expédition dès demain !</p>
            </div>
          </div>
          <div className='flex justify-between gap-6'>
          <ConteneurQuantity quantityProduct={quantityProduct} heightInput='11' paddingButton='3' setQuantityProduct={setQuantityProduct}/>

            <button className="rounded-lg bg-emerald-900 text-white w-2/3">Ajouter au panier</button>
          </div>
        </div>

        <div className='p-2 bg-white rounded-lg border shadow-lg flex flex-col gap-2'>
          <div className='flex gap-2'>
            <img src="/icones/verifier_white.png" alt="" className='w-6 h-6' />
            <p><span className='font-semibold'>Avis client </span>- *****</p>

          </div>
          <div className='flex gap-2'>
            <img src="/icones/verifier_white.png" alt="" className='w-6 h-6' />
            <p><span className='font-semibold'>Payement sécurisé </span></p>
          </div>
          <div className='flex gap-2'>
            <img src="/icones/verifier_white.png" alt="" className='w-6 h-6' />
            <p><span className='font-semibold'>Livraison gratuite </span>dès 59 € d'achats</p>
          </div>
          <div className='flex gap-2'>
            <img src="/icones/verifier_white.png" alt="" className='w-6 h-6' />
            <p>Payement <span className='font-semibold'>en 3x  sans frais</span> dès 60 €</p>
          </div>
        </div>
      </div>
    )
  }
  
  const PlantSuggestions = ({ }) => {
    return (
      <div className="w-full flex flex-col items-center gap-6">
        <h2 className="text-3xl font-semibold">Vous pourriez aussi aimer ceci...</h2>
        <div className='w-4/5 flex justify-center'>
          <Swiper3Plants></Swiper3Plants>
        </div>

      </div>
    );
  };
  return (
    <>
      <div className="bg-custom-light py-6 flex flex-col items-center gap-6">
        <div className="w-3/4 flex flex-col gap-4">
          {/* Chemin */}
          <p className="text-left w-full text-gray-500">
            Accueil / Plantes / Plantes vivaces / Fleurs vivaces / Oenanthe / Oenothères roses Siskiyou Pink
          </p>

          {/* Content Section */}
          <div className="w-full flex flex-col xl:flex-row justify-center items-start gap-8">

            {/* Swiper Container */}
            <div className="w-3/6 order-1 xl:order-2">
              <div className="swiper-controller">
                <Swiper
                  slidesPerView={1}
                  effect={'fade'}
                  fadeEffect={{ crossFade: true }}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  modules={[EffectFade]}
                  className="clientSwiper"
                >
                  {images.map((imgSrc, index) => (
                    <SwiperSlide key={index}>
                      <img src={imgSrc} alt={`Slide ${index + 1}`} className="w-full h-[75vh] object-cover rounded-md" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Miniatures */}
            <div className="py-1 max-xl:w-full w-1/6 h-full xl:top-0 order-2 xl:order-1 custom-controls flex xl:flex-col justify-start items-center gap-4">
              {images.map((imgSrc, index) => (
                <ImgPlants
                  key={index}
                  imgSrc={imgSrc}
                  isActive={activeIndex === index}
                  onClick={() => handleSlideChange(index)}
                />
              ))}
            </div>

            {/* Product Details */}
            <DetailProduct nom='Oenothères roses Siskiyou' nomLatin="'Oenothères roses Siskiyou'" reduction='50%' prixInitial='11.99' prixReduit='5.99' typePlant='Couvre-sol rose délicat' litrageDisponible='2L'></DetailProduct>
          </div>
        </div>
        <CaracteristiqueProduit couleur='Rose' debutFloraison='Juin' finFloraison='Août' hauteurMax='35' Parfum='Parfumé' DistancePlantation='25 - 30' PeriodePlantation='Février - Mai , Septembre - Décembre' FrequenceArrosage='Modéré' Exposition="Lieu ensoleillé" />
        <PlantSuggestions></PlantSuggestions>
      </div>
    </>
  );
}

export default ProductPage;
