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
        <p>{label}</p>
        <span className="buttonHover-icon w-full flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </span>
      </a>

    );
  }
  // const ConteneurPlant = ({ primaryImage, secondaryImage, altPrimary, altSecondary }) => {
  //   return (
  //     <div className='bg-white rounded-lg flex flex-col font-semibold'>
  //       <a href='/produit/1' className='group relative w-full h-96'>
  //         <img
  //           src={primaryImage}
  //           alt={altPrimary}
  //           className="object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0"
  //         />
  //         <img
  //           src={secondaryImage}
  //           alt={altSecondary}
  //           className="object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
  //         />
  //       </a>

  //       <div className='flex flex-col items-center gap-4 pb-2'>
  //         <p className='bg-lime-500 text-white w-full text-center'>Croissance rapide et non traçant</p>
  //         <a href='/plant/1' className='flex justify-start w-full px-2'>20 Alliums Eros</a>
  //         <div className='flex justify-between w-full px-2'>
  //           <p className='flex items-center'>- 50 %</p>
  //           <div className='flex flex-col gap-1'>
  //             <p>3.99 euros</p>
  //             <p>5.99 euros</p>
  //           </div>
  //         </div>
  //         <p className='flex gap-2'>
  //           <img src="src/assets/icones/verifier.png" alt="" className='w-6 h-6' />
  //           <span>En stock</span>
  //         </p>
  //         <button className='rounded-md flex justify-center w-3/4 px-3 py-2 bg-lime-700 text-white font-semibold'>
  //           Ajouter au panier
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

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
      <div id="carrousel" className="carousel py-2 h-10 w-full bg-custom-pastel text-zinc-800"></div>
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
            <TitreSection texte="Promotions" textColor="text-lime-500" taillePolice="text-2xl" />
            <TitreSection texte="Les promotions jusqu'à -40% !" textColor="text-rose-500" taillePolice="text-3xl" />
          </div>
          <div className='w-5/6 flex justify-center'>
            <Swiper3Plants></Swiper3Plants>
          </div>
          <button className='px-5 py-4 bg-rose-600 rounded-xl text-white font-semibold uppercase'> Voir toute la sélection </button>
        </div>
        <div className='flex flex-col items-center gap-8 justify-center w-full bg-emerald-900 py-8'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Nos inspirations Jardins" textColor="text-lime-500" taillePolice="text-2xl" />
            <TitreSection texte="Vous souhaitez aménager" textColor="text-white" taillePolice="text-3xl" />
          </div>
          <div className='grid grid-cols-2 gap-4 w-5/6'>
            <LienInspiration texte="Un jardin" image={"src/assets/images/plant2.jpeg"}></LienInspiration>
            <LienInspiration texte="Un potager" image={"src/assets/images/plant2.jpeg"}></LienInspiration>
            <LienInspiration texte="Une terrasse" image={"src/assets/images/plant2.jpeg"}></LienInspiration>
            <LienInspiration texte="Un intérieur" image={"src/assets/images/plant2.jpeg"}></LienInspiration>
          </div>
        </div>
        <div className='flex flex-col items-center gap-8 justify-center w-full  py-8'>
          <div className='flex flex-col gap-2 text-center'>
            <TitreSection texte="Sélection" textColor="text-lime-500" taillePolice="text-2xl" />
            <TitreSection texte="Les plantes préférées des jardiniers" textColor="text-rose-600" taillePolice="text-3xl" />
          </div>
          <div className='flex justify-center w-5/6'>
            <Swiper3Plants></Swiper3Plants>
          </div>
        </div>
        <div className='flex flex-col items-center gap-8 justify-center w-full bg-emerald-900 py-8'>
          <TitreSection texte="-15% de remise sur votre première commande !" textColor="text-white" taillePolice="text-3xl" />
          <p className='text-white'> Conseils, promotions, nouveautés, inspiration et plus encore, restez informé de toute notre actualité ! </p>


        </div>
      </div>
    </>
  )
}

export default HomePage;
