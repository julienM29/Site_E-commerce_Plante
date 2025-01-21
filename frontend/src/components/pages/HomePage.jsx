import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import gsap from "gsap";
import Swiper3Plants from '../shared/Swiper3Plants';
import ConteneurPlant from '../shared/ConteneurPlant';
import 'swiper/css';
import 'swiper/css/navigation';

function HomePage() {


  const Button = ({ bgColor, textColor, label, onClick }) => {
    return (
      <a
        href="#"
        className={`buttonHover transform hover:translate-y-[-10px] transition-all duration-300 text-right flex-1 flex flex-col py-4 px-3 h-36 gap-4 border shadow-lg rounded-md ${bgColor} ${textColor}`}
      >
        <p className='text-3xl'>{label}</p>
        <span className="buttonHover-icon w-full flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12h17M12 5l7 7-7 7"></path>
          </svg>
        </span>

      </a>

    );
  }

  const LienInspiration = ({ image, texte }) => {
    return (
      <a href='#' className='relative object-cover flex justify-center'>
        <img src={image} alt="" className='rounded-2xl h-72 w-96' />
        <h3 className='absolute bottom-1 text-center text-white text-2xl font-bold bg-black bg-opacity-40 px-3 py-1 rounded-md'>
          {texte}
        </h3>
      </a>

    )
  }
  const TitreSection = ({ texte, textColor, taillePolice }) => {
    return (
      <p className={` font-semibold ${textColor} ${taillePolice}`}>{texte}</p>
    )
  }
  return (
    <>
      <div className="relative w-full h-[80vh] bg-cover bg-center bg-[url('/images/fond_accueil.webp')]">
        <div className="absolute inset-0 flex flex-col gap-8 text-white items-center justify-center bg-black bg-opacity-10">
          <h1 className="text-5xl font-bold">Découvrez notre large gamme de produits</h1>
          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-semibold text-white rounded-lg text-2xl px-5 py-2.5 text-center shadow-md hover:shadow-lg transition-all duration-500 ease-in-out"
          >
            Je découvre
          </button>
        </div>
      </div>

      <div className="bg-custom-light py-6 min-h-screen flex flex-col items-center gap-6">
        <TitreSection texte="Jardinerie en ligne Kerisnel - Vente de plantes et graines à cultiver" textColor="text-zinc-700" taillePolice="text-2xl" />
        <div className='w-3/5 max-xl:grid xl:flex gap-4 font-semibold max-xl: grid-cols-2'>
          <Button
            bgColor="bg-red-400"
            textColor="text-white"
            label="Prix en baisse"
            onClick={() => handleClick('Prix en baisse')}
          />
          <Button
            bgColor="bg-white"
            textColor="text-rose-500"
            label="Petits prix"
            onClick={() => handleClick('Petits prix')}
          />
          <Button
            bgColor="bg-rose-500"
            textColor="text-white"
            label="Promotions"
            onClick={() => handleClick('Promotions')}
          />
          <Button
            bgColor="bg-emerald-600"
            textColor="text-white"
            label="Nouveauté"
            onClick={() => handleClick('Nouveauté')}
          />
        </div>
        <div className='w-11/12 flex flex-col items-center gap-8 py-8'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Promotions" textColor="text-lime-500" taillePolice="text-3xl" />
            <div className='flex items-center gap-8'>
              <img src="/icones/etiquette.png" alt="" className='w-16' />

              <TitreSection texte="Les promotions jusqu'à -40% !" textColor="text-rose-500" taillePolice="text-5xl" />
              <img src="/icones/etiquette.png" alt="" className='w-16' /></div>
          </div>
          <div className='w-full flex justify-center'>
            <Swiper3Plants></Swiper3Plants>
          </div>
          <button className='px-5 py-4 bg-rose-600 rounded-xl text-white font-semibold uppercase'> Voir toute la sélection </button>
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
        <div className='w-11/12 flex flex-col items-center gap-8 justify-center py-8'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Sélection" textColor="text-lime-500" taillePolice="text-3xl" />

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
            <Swiper3Plants></Swiper3Plants>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 justify-center w-full bg-emerald-900 py-8'>
          <TitreSection texte="-15% de remise sur votre première commande !" textColor="text-white" taillePolice="text-3xl" />
          <p className='text-white'> Conseils, promotions, nouveautés, inspiration et plus encore, restez informé de toute notre actualité ! </p>
        </div>
        <div className='w-3/4 flex flex-col items-center justify-center py-8 gap-12'>
          <TitreSection texte="Les meilleures ventes" textColor="text-lime-500" taillePolice="text-5xl" />
          <Swiper3Plants></Swiper3Plants>
        </div>
      </div>
    </>
  )
}

export default HomePage;
