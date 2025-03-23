import React from 'react';

const BoutonNavigation = ({ bgColor, textColor, label, linkId, icones, handleScrollToSection }) => {
    return (
        <a
          href="#"
          onClick={(event) => handleScrollToSection(event, linkId)} // ✅ Passe `event` à la fonction
          className={`overflow-hidden buttonHover transform hover:translate-y-[-10px] transition-all duration-300 flex justify-between items-start px-5 py-4 w-[400px] h-36 gap-4 border shadow-lg rounded-md ${bgColor} ${textColor}`}
        >
          {/* Texte en haut à gauche */}
          <p className="text-3xl">{label}</p>
        
          {/* Conteneur pour l'image avec overflow: hidden */}
          <div className="absolute -bottom-6 -right-3 w-32 h-32">
            {/* Image inclinée à 45°, rognée si elle dépasse */}
            <img
              src={`/icones/${icones}`}
              alt=""
              className="w-full h-full transform rotate-[20deg] object-cover"
            />
          </div>
        </a>
    );
};

export default BoutonNavigation;
