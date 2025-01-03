import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import gsap from "gsap";
import Swiper3Plants from './Swiper3Plants';
import ConteneurPlant from './ConteneurPlant';
import 'swiper/css';
import 'swiper/css/navigation';

function HomePage() {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  // Faire une requête GET vers Fastify
  //   fetch('http://127.0.0.1:3000/api/data')
  //     .then(response => response.json())
  //     .then(data => setMessage(data.message))
  //     .catch(error => console.error('Error:', error));
  // }, []);
  useEffect(() => {

    const carrousel = document.getElementById("carrousel");
    const texts = [
      "Livraison offerte dès 59 euros d'achat en point relais",
      "Découvrez notre large gamme de produits",
      "Profitez des réductions en étant membre prémium",
      "Jusqu'à -30% sur certains produits, offre spéciale Noël !!"
    ];

    let index = 0;

    function changeText() {
      // Créer une nouvelle div pour le texte
      const newText = document.createElement("div");
      newText.classList.add("carousel-text");
      newText.innerText = texts[index];
      carrousel.appendChild(newText);

      // Animer l'opacité du texte (fade-in)
      gsap.to(newText, {
        opacity: 1,
        duration: 0.5, // Plus rapide pour le premier texte
        ease: "power2.inOut",
        onComplete: () => {
          // Une fois l'animation terminée, après un délai, faire disparaître le texte précédent
          setTimeout(() => {
            gsap.to(newText, {
              opacity: 0,
              duration: 1,
              ease: "power2.out",
              onComplete: () => {
                // Supprimer l'ancien texte
                carrousel.removeChild(newText);
              }
            });
          }, 3000); // Afficher le texte pendant 2 secondes avant de le faire disparaître
        }
      });

      // Passer au texte suivant
      index = (index + 1) % texts.length; // Boucler sur les textes
    }

    // Afficher immédiatement le premier texte
    changeText();

    // Démarrer le changement de texte toutes les 5 secondes après l'affichage initial
    setInterval(changeText, 4000);

  })
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
      <div id="carrousel" className="carousel py-2 h-10 w-full bg-emerald-100 text-zinc-800"></div>
      <div className="bg-custom-light py-4 min-h-screen flex flex-col items-center gap-6">
        <TitreSection texte="Jardinerie en ligne Kerisnel - Vente de plantes et graines à cultiver" textColor="text-zinc-700" taillePolice="text-2xl" />
        <div className='w-9/12 max-xl:grid xl:flex gap-4 font-semibold max-xl: grid-cols-2'>
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
              <img src="src/assets/icones/etiquette.png" alt="" className='w-16'/>
            
            <TitreSection texte="Les promotions jusqu'à -40% !" textColor="text-rose-500" taillePolice="text-5xl" />
            <img src="src/assets/icones/etiquette.png" alt="" className='w-16'/></div>
          </div>
          <div className='w-5/6 flex justify-center'>
            <Swiper3Plants></Swiper3Plants>
          </div>
          <button className='px-5 py-4 bg-rose-600 rounded-xl text-white font-semibold uppercase'> Voir toute la sélection </button>
        </div>
        <div className='flex flex-col items-center gap-10 justify-center w-full bg-emerald-900 py-8'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Nos inspirations Jardins" textColor="text-lime-500" taillePolice="text-2xl" />
            <TitreSection texte="Vous souhaitez aménager" textColor="text-white" taillePolice="text-3xl" />
          </div>
          <div className='max-md:grid max-md:grid-cols-2 flex md:justify-center gap-4 w-5/6'>
            <LienInspiration texte="Un jardin" image={"src/assets/images/jardin.avif"}></LienInspiration>
            <LienInspiration texte="Un potager" image={"src/assets/images/potager.jpg"}></LienInspiration>
            <LienInspiration texte="Une terrasse" image={"src/assets/images/terrasse.jpg"}></LienInspiration>
            <LienInspiration texte="Un intérieur" image={"src/assets/images/plant_interieur.jpg"}></LienInspiration>
          </div>
        </div>
        <div className='w-11/12 flex flex-col items-center gap-8 justify-center py-8'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Sélection" textColor="text-lime-500" taillePolice="text-2xl" />
            <TitreSection texte="Les plantes préférées des jardiniers" textColor="text-rose-600" taillePolice="text-3xl" />
          </div>
          <div className='flex justify-center w-5/6'>
            <Swiper3Plants></Swiper3Plants>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4 justify-center w-full bg-emerald-900 py-8'>
          <TitreSection texte="-15% de remise sur votre première commande !" textColor="text-white" taillePolice="text-3xl" />
          <p className='text-white'> Conseils, promotions, nouveautés, inspiration et plus encore, restez informé de toute notre actualité ! </p>
        </div>
        <div className='w-3/4 flex flex-col items-center justify-center py-8 gap-12'>
                    <h2 className='text-5xl font-semibold text-gray-700'>Les meilleures ventes </h2>
                    <Swiper3Plants></Swiper3Plants>
                </div>
      </div>
    </>
  )
}

export default HomePage;
