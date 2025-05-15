import React from 'react';

const EsthetiqueProduct = ({
  periodeFloraison,
  hauteurMin,
  hauteurMax,
  fleurCouper,
  couleur,
  persistant,
  parfum,
  port,
  largeurMin,
  largeurMax,
  couleurFeuille
}) => {
  return (
    <div className="caracteristique flex w-full md:w-1/3 px-4 flex-col gap-4 ">
      <h2 className="uppercase text-rose-700 text-xl md:text-2xl font-semibold">Esthétique</h2>
      <div className="flex flex-col gap-4">

        {/* Couleur principale */}
        <div className="flex items-start gap-3">
          <img src="/icones/couleur.png" alt="Couleur" className="w-8 h-8 md:w-10 md:h-10" />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm md:text-base">Couleur</p>
            <p className="text-sm md:text-base">{couleur}</p>
          </div>
        </div>

        {/* Couleur des feuilles */}
        {couleurFeuille && (
          <div className="flex items-start gap-3">
            <img src="/icones/couleur.png" alt="Couleur feuilles" className="w-8 h-8 md:w-10 md:h-10" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-sm md:text-base">Couleur des feuilles</p>
              <p className="text-sm md:text-base">{couleurFeuille}</p>
            </div>
          </div>
        )}

        {/* Floraison */}
        <div className="flex items-start gap-3">
          <img src="/icones/floraison.png" alt="Floraison" className="w-8 h-8 md:w-10 md:h-10" />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-sm md:text-base">Période de floraison</p>
            <p className="text-sm md:text-base">{periodeFloraison}</p>
          </div>
        </div>

        {/* Hauteur */}
        {(hauteurMin !== undefined || hauteurMax !== undefined) && (
          <div className="flex items-start gap-3">
            <img src="/icones/hauteur.png" alt="Hauteur" className="w-8 h-8 md:w-10 md:h-10" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-sm md:text-base">Hauteur à maturité</p>
              <p className="text-sm md:text-base">
                {hauteurMax === hauteurMin ? `${hauteurMax} cm` : `${hauteurMin} - ${hauteurMax} cm`}
              </p>
            </div>
          </div>
        )}

        {/* Parfum */}
        {parfum !== 0 && (
          <div className="flex items-start gap-3">
            <img src="/icones/parfum.png" alt="Parfum" className="w-8 h-8 md:w-10 md:h-10" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-sm md:text-base">Parfumé</p>
              <p className="text-sm md:text-base">{parfum}</p>
            </div>
          </div>
        )}

        {/* Feuillage persistant */}
        {persistant !== 0 && (
          <div className="flex items-start gap-3">
            <img src="/icones/feuille_persistant.png" alt="Persistant" className="w-8 h-8 md:w-10 md:h-10" />
            <p className="font-bold text-sm md:text-base">Feuillage persistant</p>
          </div>
        )}

        {/* Fleurs à couper */}
        {fleurCouper !== 0 && (
          <div className="flex items-start gap-3">
            <img src="/icones/feuille_persistant.png" alt="Fleur à couper" className="w-8 h-8 md:w-10 md:h-10" />
            <p className="font-bold text-sm md:text-base">Fleurs à couper</p>
          </div>
        )}

        {/* Port */}
        {port && (
          <div className="flex items-start gap-3">
            <img src="/icones/port.png" alt="Port" className="w-8 h-8 md:w-10 md:h-10" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-sm md:text-base">Port de la plante</p>
              <p className="text-sm md:text-base">{port}</p>
            </div>
          </div>
        )}

        {/* Largeur */}
        {(largeurMin !== 0 || largeurMax !== 0) && (
          <div className="flex items-start gap-3">
            <img src="/icones/largeur.png" alt="Largeur" className="w-8 h-8 md:w-10 md:h-10" />
            <div className="flex flex-col gap-1">
              <p className="font-bold text-sm md:text-base">Largeur de la plante</p>
              <p className="text-sm md:text-base">
                {largeurMin === largeurMax ? `${largeurMax} cm` : `${largeurMin} - ${largeurMax} cm`}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EsthetiqueProduct;
