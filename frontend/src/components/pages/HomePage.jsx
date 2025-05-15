import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperPromotion from '../shared/SwipperPromotion';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'; // ou un custom hook

import gsap from 'gsap'; // Importer GSAP
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import LienInspiration from '../shared/homePage/LienInspiration';
import TitreSection from '../shared/homePage/TitreSection';
import BoutonNavigation from '../shared/homePage/BoutonNavigation';
import { getUserInfoAndWishList } from '../shared/UserUtils';
import { searchSelection } from '../shared/loadProduct';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapAnimations } from '../../useGsapAnimations';
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [dataPromotionsPlants, setDataPromotionsPlants] = useState([]);
  const [dataNouveautesPlants, setDataNouveautesPlants] = useState([]);
  const [dataSelectionPlants, setDataSelectionPlants] = useState([]);
  const [userID, setUserID] = useState();
  const [dataCookie, setDataCookie] = useState();
  const isDesktop = useMediaQuery({ minWidth: 768 }); // md: breakpoint de Tailwind

  useGsapAnimations(dataPromotionsPlants, dataNouveautesPlants, dataSelectionPlants); // 🆕 appel du hook

  const searchPromotions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/loadPromotionProduct`);
      const data = await response.json();
      setDataPromotionsPlants(data.products || []);
    } catch (error) {
      console.error('Erreur lors du chargement des plantes:', error);
    }
  };
  const searchNouveautes = async () => {
    try {
      const response = await fetch(`http://localhost:3000/loadNouveauteProduct`);
      const data = await response.json();
      setDataNouveautesPlants(data.products || []);
    } catch (error) {
      console.error('Erreur lors du chargement des plantes:', error);
    }
  };

  const handleScrollToSection = (event, sectionName) => {
    if (event) event.preventDefault(); // Empêche l'ajout du # dans l'URL

    const section = document.getElementById(sectionName);
    if (section) {
      // Utilisation de GSAP pour animer le scroll
      gsap.to(window, {
        scrollTo: {
          y: section,  // L'élément cible vers lequel tu veux défiler
          offsetY: 50  // Décalage si nécessaire
        },
        duration: 1,
        ease: "power2.inOut"
      });
    }
  };

  useEffect(() => {
    searchPromotions();
    searchNouveautes();
    searchSelection(setDataSelectionPlants);
    getUserInfoAndWishList(setUserID, setDataCookie);



  }, []);

  return (
    <>
      <div className="relative w-full h-[50vh] md:h-[80vh] md:bg-center bg-cover bg-[url('/images/fond_accueil.webp')] ">
        <div className="absolute inset-0 flex flex-col gap-8 text-white items-center justify-center bg-gradient-to-b from-black/40 to-black/10">
          <h1 className="max-md:text-xl text-5xl font-bold text-center px-4">Découvrez notre large gamme de produits</h1>
          <a
            href="/search"
            className="bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-semibold text-white rounded-full max-md:text-lg text-2xl px-8 py-3 text-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Je découvre
          </a>
        </div>
      </div>


      <div className="bg-custom-light  py-6 min-h-screen flex flex-col items-center gap-6">
        <TitreSection texte="Jardinerie en ligne Kerisnel - Vente de plantes et graines à cultiver" textColor="text-zinc-700" taillePolice={isDesktop ? 'text-2xl' : 'text-md'} />
        <div className="max-md:grid max-md:grid-cols-1 flex md:justify-center gap-2 md:gap-4 w-3/4  md:w-5/6">
          <BoutonNavigation
            bgColor="bg-orange-500"
            textColor="text-white"
            label="Meilleures ventes"
            icones="meilleur_vente.png"
            linkId="meilleures_ventes"
            handleScrollToSection={handleScrollToSection}
            className="py-4 px-6 text-lg md:text-base w-full"
          />

          <BoutonNavigation
            bgColor="bg-red-600"
            textColor="text-white"
            label="Promotions"
            icones="promotions.jpg"
            linkId="promotion"
            handleScrollToSection={handleScrollToSection}
            className="py-4 px-6 text-lg md:text-base w-full"
          />

          <BoutonNavigation
            bgColor="bg-teal-500"
            textColor="text-white"
            label="Nouveauté"
            linkId="nouveautés"
            icones="new_product.jpeg"
            handleScrollToSection={handleScrollToSection}
            className="py-4 px-6 text-lg md:text-base w-full"
          />
        </div>

        <div className='w-5/6 max-xl:grid xl:flex gap-4 font-semibold max-xl:grid-cols-2 flex justify-center'>

        </div>
        <div className='w-11/12 flex flex-col items-center gap-8 py-8 promotion-section' id='promotion'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Promotions" textColor="text-lime-500" taillePolice={isDesktop ? 'text-3xl' : 'text-2xl'} />
            <div className='flex items-center gap-4 md:gap-8'>
              <img src="/icones/etiquette.png" alt="" className='w-8 md:w-16' />

              <TitreSection texte="Les promotions jusqu'à -40% !" textColor="text-rose-500" taillePolice={isDesktop ? 'text-5xl' : 'text-xl'} />
              <img src="/icones/etiquette.png" alt="" className='w-8 md:w-16' /></div>
          </div>
          <div className='w-full flex justify-center'>
            <SwiperPromotion nbSlides={isDesktop ? 4 : 1} products={dataPromotionsPlants} userID={userID} dataCookie={dataCookie}></SwiperPromotion>
          </div>
          <Link
            to={`/search?p=true`}
            className="px-4 md:px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-semibold uppercase rounded-full shadow-md hover:shadow-2xl flex items-center gap-3 text-sm md:text-base transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Voir toutes les promotions
          </Link>
        </div>
        <div className='flex flex-col items-center gap-10 justify-center w-full bg-emerald-900 py-8'>
          <div className='flex flex-col gap-4 text-center'>
            <TitreSection texte="Nos inspirations Jardins" textColor="text-lime-500" taillePolice={isDesktop ? 'text-3xl' : 'text-xl'} />
            <TitreSection texte="Vous souhaitez aménager" textColor="text-white" taillePolice={isDesktop ? 'text-4xl' : 'text-2xl'} />
          </div>
          <div className='max-md:grid max-md:grid-cols-1 flex md:justify-center gap-4 w-5/6'>
            <LienInspiration texte="Un jardin" image={"/images/jardin.avif"} link={'/amenager-mon-jardin'}></LienInspiration>
            <LienInspiration texte="Un potager" image={"images/potager.jpg"}></LienInspiration>
            <LienInspiration texte="Une terrasse" image={"images/terrasse.jpg"}></LienInspiration>
            <LienInspiration texte="Un intérieur" image={"images/plant_interieur.jpg"}></LienInspiration>
          </div>
        </div>
        <div className='w-11/12 flex flex-col items-center gap-8 justify-center py-8' id='meilleures_ventes'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Meilleurs ventes" textColor="text-lime-500" taillePolice={isDesktop ? 'text-3xl' : 'text-2xl'} />

            <div className='flex gap-2 items-center text-rose-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <TitreSection texte="Les plantes préférées des jardiniers" textColor="text-rose-600" taillePolice={isDesktop ? 'text-4xl' : 'text-xl'} />

              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

            </div>
          </div>
          <div className='flex justify-center w-full'>
            <SwiperPromotion nbSlides={isDesktop ? 4 : 1} products={dataSelectionPlants} userID={userID} dataCookie={dataCookie}></SwiperPromotion>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 justify-center w-full bg-emerald-900 py-8'>
          <TitreSection texte="-15% de remise sur votre première commande !" textColor="text-white" taillePolice={isDesktop ? 'text-3xl' : 'text-lg'} />
          <p className='text-white max-md:text-center max-md:px-2 max-md:text-xs'> Conseils, promotions, nouveautés, inspiration et plus encore, restez informé de toute notre actualité ! </p>
        </div>
        <div className='w-11/12 flex flex-col items-center gap-8 justify-center py-8' id='nouveautés'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Nouveautés" textColor="text-lime-500" taillePolice={isDesktop ? 'text-3xl' : 'text-2xl'} />

            <div className='flex gap-2 items-center text-rose-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <TitreSection texte="Les dernières plantes ajoutées" textColor="text-rose-600" taillePolice={isDesktop ? 'text-4xl' : 'text-xl'} />

              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

            </div>
          </div>
          <div className='flex justify-center w-full'>
            <SwiperPromotion nbSlides={isDesktop ? 4 : 1} products={dataNouveautesPlants} userID={userID} dataCookie={dataCookie}></SwiperPromotion>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;
