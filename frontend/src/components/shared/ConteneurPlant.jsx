import React, { useState, useCallback, useEffect } from 'react';
import WishlistButton from './search/BoutonWishList';
import { AjoutPanier } from './panier/Alert';
import { useDispatch } from 'react-redux';

const ConteneurPlant = ({ taille, hauteur, id, primaryImage, secondaryImage, altPrimary, altSecondary, nom, descriptionRapide, prixInitial, reduction, infoStock, idUser, isWishlisted }) => {
  const dispatch = useDispatch(); // ✅ Utiliser useDispatch dans un composant React
  const image = primaryImage.replace("images/", "")
  const [prixReduit, setPrixReduit] = useState(parseFloat(prixInitial * (1 - Number(reduction) / 100)).toFixed(2) || null);

  return (
    <div className={`bg-white rounded-3xl flex flex-col font-semibold w-${taille} h-[450px] md:h-[500px] border relative`}>
      <WishlistButton plantId={id} userId={idUser} isWishlisted={isWishlisted} />
      {reduction && (
        <p className='w-3/4 max-md:text-xs text-center roup z-10 absolute top-10 md:top-5 left-0 p-1 border rounded-e-lg bg-white/90 '>- {reduction} % sur le produit</p>

      )}

      <a href={`/produit/${id}`} className='group relative w-full max-md:h-[50%] h-[60%]'>
        <img
          src={primaryImage}
          alt={altPrimary}
          className="rounded-t-3xl object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <img
          src={secondaryImage}
          alt={altSecondary}
          className="rounded-t-xl object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </a>
      <div className='w-full flex flex-col justify-between gap-4 pb-4 max-md:h-[50%] h-[40%]'>
        <p className='bg-bande-description text-white w-full text-center max-md:text-xs'>{descriptionRapide}</p>
        <div className='w-full h-full flex flex-col  gap-4'>
          <a href='/plant/1' className='block max-w-[90%] text-md md:text-lg px-2 font-semibold text-emerald-950 truncate overflow-hidden min-w-0'>{nom}</a>

          {reduction ? (
            <div className='flex gap-2 justify-end w-full px-2'>
            <p className='text-gray-600 font-bold text-sm md:text-base line-through'>{prixInitial} € </p>
            <p className='text-pink-700 font-bold text-xl md:text-2xl'>{prixReduit} € </p>

          </div>
          ) : (
            <div className='flex justify-end w-full px-2'>
              <p className='text-pink-700 font-bold text-2xl'>{prixInitial} € </p>
            </div>
          )
          }
        </div>

        <div className="w-full flex flex-col md:flex-row md:justify-between items-center gap-4 px-4">
  <div className="flex items-center gap-2 w-full md:w-auto max-md:justify-center">
    <img src="/icones/verifier.png" alt="Stock disponible" className="w-6 h-6" />
    <span className="text-gray-700 text-sm md:text-base">{infoStock}</span>
  </div>
  
  <button
    className="max-md:w-full  rounded-3xl max-md:px-2 px-4 py-2 bg-emerald-800 text-white font-bold text-sm  transition-transform transform hover:scale-105 duration-300"
    onClick={() => AjoutPanier(dispatch, id, nom, prixInitial, prixReduit, image)}
  >
    Ajouter au panier
  </button>
</div>

      </div>
    </div>
  );
};

export default ConteneurPlant;
