import React from 'react';

const BoutonNavigation = ({ bgColor, textColor, label, linkId, icones, handleScrollToSection }) => {
    return (
      <a
      href="#"
      onClick={(event) => handleScrollToSection(event, linkId)} // ✅ Passe `event` à la fonction
      className={`navigationBouton overflow-hidden flex justify-between items-start px-3 md:px-6 py-5 flex-1 md:w-[420px]  h-32 md:h-36  gap-6 border-2 shadow-xl rounded-xl ${bgColor} ${textColor}  hover:shadow-2xl `} 
    >
      {/* Texte en haut à gauche */}
      <p className="md:text-2xl text-lg font-semibold text-shadow-md">{label}</p>
    
      {/* Conteneur pour l'image avec overflow: hidden */}
      <div className="absolute  -bottom-6 -right-2 w-20 md:w-32 h-20 md:h-32">
        {/* Image inclinée à 45°, rognée si elle dépasse */}
        <img
          src={`/icones/${icones}`}
          alt="icône"
          className="w-full h-full transform rotate-[20deg]   object-contain md:object-cover transition-transform duration-300 ease-in-out "
        />
      </div>
    </a>
    
    );
};

export default BoutonNavigation;
