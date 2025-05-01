import React, { useEffect } from 'react';
import gsap from 'gsap';

const Carroussel = ({taille}) => {
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
            newText.classList.add(taille);
            newText.innerText = texts[index];
            carrousel.appendChild(newText);

            // Animer l'opacité du texte (fade-in)
            gsap.to(newText, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    // Faire disparaître le texte après un délai
                    setTimeout(() => {
                        gsap.to(newText, {
                            opacity: 0,
                            duration: 1,
                            ease: "power2.out",
                            onComplete: () => {
                                carrousel.removeChild(newText);
                            }
                        });
                    }, 3000);
                }
            });

            // Passer au texte suivant
            index = (index + 1) % texts.length;
        }

        // Afficher immédiatement le premier texte
        changeText();

        // Démarrer le changement de texte toutes les 4 secondes
        const interval = setInterval(changeText, 4000);

        // Nettoyer l'intervalle lors du démontage
        return () => clearInterval(interval);

    }, []); // Dépendances vides pour n'exécuter qu'une fois à l'initialisation

    return (
        <div id="carrousel" className="carousel py-2 h-10 w-full bg-slider-text text-white font-normal max-md:text-sm"></div>
    );
};

export default Carroussel;
