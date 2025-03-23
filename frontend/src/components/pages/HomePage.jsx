import React, { useEffect, useState } from 'react';
import Swiper3Plants from '../shared/Swiper3Plants';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperPromotion from '../shared/SwipperPromotion';
import { checkUserConnect } from '../shared/CheckUserInformation';
import { Link } from "react-router-dom";

import gsap from 'gsap'; // Importer GSAP
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import LienInspiration from '../shared/homePage/LienInspiration';
import TitreSection from '../shared/homePage/TitreSection';
import BoutonNavigation from '../shared/homePage/BoutonNavigation';
gsap.registerPlugin(ScrollToPlugin);

function HomePage() {
  const [dataPromotionsPlants, setDataPromotionsPlants] = useState([]);
  const [dataNouveautesPlants, setDataNouveautesPlants] = useState([]);
  const [dataSelectionPlants, setDataSelectionPlants] = useState([]);
  const [userID, setuserID] = useState();
  const [dataCookie, setDataCookie] = useState();    

  const getUserInfo = async () => {
    const result = await checkUserConnect();
    const resultIDUser = result.user.id;
    setuserID(resultIDUser)
  };

  const wishList = async () => {
    try {
      const response = await fetch(`http://localhost:3000/checkWishList`, {
        credentials: "include",
      });
      const dataWishList = await response.json();
      setDataCookie(dataWishList.wishList);
    } catch (error) {
      console.error("Erreur lors de la vérification de la wishlist:", error);
    } 
};
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
  const searchSelection = async () => {
    try {
      const response = await fetch(`http://localhost:3000/loadSelectionProduct`);
      const data = await response.json();
      setDataSelectionPlants(data.products || []);
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
    searchSelection();
    getUserInfo();
    wishList();
  }, []);
  return (
    <>
      <div className="relative w-full h-[80vh] bg-cover bg-center bg-[url('/images/fond_accueil.webp')]">
        <div className="absolute inset-0 flex flex-col gap-8 text-white items-center justify-center bg-black bg-opacity-10">
          <h1 className="text-5xl font-bold">Découvrez notre large gamme de produits</h1>
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-semibold text-white rounded-lg text-2xl px-5 py-2.5 text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out"
          >
            <a href="/search">Je découvre</a>

          </button>
        </div>
      </div>

      <div className="bg-custom-light py-6 min-h-screen flex flex-col items-center gap-6">
        <TitreSection texte="Jardinerie en ligne Kerisnel - Vente de plantes et graines à cultiver" textColor="text-zinc-700" taillePolice="text-2xl" />
        <div className='w-3/5 max-xl:grid xl:flex gap-4 font-semibold max-xl: grid-cols-2'>
        <BoutonNavigation
            bgColor="bg-orange-500"
            textColor="text-white"
            label="Meilleures ventes"
            icones='meilleurs_vente.jpg'
            linkId={'meilleures_ventes'}
            handleScrollToSection={handleScrollToSection}
            
          />
         
         <BoutonNavigation
            bgColor="bg-red-600"
            textColor="text-white"
            label="Promotions"
            icones='promotions.jpg'
            linkId={'promotion'}
            handleScrollToSection={handleScrollToSection}
          />
          <BoutonNavigation
            bgColor="bg-teal-500"
            textColor="text-white"
            label="Nouveauté"
            linkId={'nouveautés'}
            icones='nouveautes.jpg'
            handleScrollToSection={handleScrollToSection}
          />
        </div>
        <div className='w-11/12 flex flex-col items-center gap-8 py-8' id='promotion'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Promotions" textColor="text-lime-500" taillePolice="text-3xl" />
            <div className='flex items-center gap-8'>
              <img src="/icones/etiquette.png" alt="" className='w-16' />

              <TitreSection texte="Les promotions jusqu'à -40% !" textColor="text-rose-500" taillePolice="text-5xl" />
              <img src="/icones/etiquette.png" alt="" className='w-16' /></div>
          </div>
          <div className='w-full flex justify-center'>
            <SwiperPromotion nbSlides={4} products={dataPromotionsPlants} userID={userID} dataCookie={dataCookie}></SwiperPromotion>
          </div>
          <Link to={`/search?p=true`} className='px-5 py-4 bg-rose-600 rounded-xl text-white font-semibold uppercase hover:bg-rose-500'> Voir toute les promotions </Link>
        </div>
        <div className='flex flex-col items-center gap-10 justify-center w-full bg-emerald-900 py-8'>
          <div className='flex flex-col gap-4 text-center'>
            <TitreSection texte="Nos inspirations Jardins" textColor="text-lime-500" taillePolice="text-3xl" />
            <TitreSection texte="Vous souhaitez aménager" textColor="text-white" taillePolice="text-4xl" />
          </div>
          <div className='max-md:grid max-md:grid-cols-2 flex md:justify-center gap-4 w-5/6'>
            <LienInspiration texte="Un jardin" image={"/images/jardin.avif"}></LienInspiration>
            <LienInspiration texte="Un potager" image={"images/potager.jpg"}></LienInspiration>
            <LienInspiration texte="Une terrasse" image={"images/terrasse.jpg"}></LienInspiration>
            <LienInspiration texte="Un intérieur" image={"images/plant_interieur.jpg"}></LienInspiration>
          </div>
        </div>
        <div className='w-11/12 flex flex-col items-center gap-8 justify-center py-8' id='meilleures_ventes'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Meilleurs ventes" textColor="text-lime-500" taillePolice="text-3xl" />

            <div className='flex gap-2 items-center text-rose-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <TitreSection texte="Les plantes préférées des jardiniers" textColor="text-rose-600" taillePolice="text-4xl" />

              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

            </div>
          </div>
          <div className='flex justify-center w-full'>
          <SwiperPromotion nbSlides={4} products={dataSelectionPlants} userID={userID} dataCookie={dataCookie}></SwiperPromotion>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 justify-center w-full bg-emerald-900 py-8'>
          <TitreSection texte="-15% de remise sur votre première commande !" textColor="text-white" taillePolice="text-3xl" />
          <p className='text-white'> Conseils, promotions, nouveautés, inspiration et plus encore, restez informé de toute notre actualité ! </p>
        </div>
        <div className='w-11/12 flex flex-col items-center gap-8 justify-center py-8' id='nouveautés'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Nouveautés" textColor="text-lime-500" taillePolice="text-3xl" />

            <div className='flex gap-2 items-center text-rose-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <TitreSection texte="Les dernières plantes ajoutées" textColor="text-rose-600" taillePolice="text-4xl" />

              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

            </div>
          </div>
          <div className='flex justify-center w-full'>
          <SwiperPromotion nbSlides={4} products={dataNouveautesPlants} userID={userID} dataCookie={dataCookie}></SwiperPromotion>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;
