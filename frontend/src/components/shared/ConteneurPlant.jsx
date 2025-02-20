import React, { useState, useCallback } from 'react';
import WishlistButton from './search/BoutonWishList';
import { AjoutPanier } from './panier/Alert';
const ConteneurPlant = ({ taille, id, primaryImage, secondaryImage, altPrimary, altSecondary, nom, descriptionRapide, prixInitial, prixReduit, reduction, infoStock,idUser, isWishlisted }) => {

  return (
    <div className={`bg-white rounded-3xl flex flex-col font-semibold w-${taille} border shadow-lg relative`}>
      <WishlistButton plantId={id} userId={idUser} isWishlisted={isWishlisted}/>
      <a href={`/produit/${id}`} className='group relative w-full h-[23rem]'>
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
      <div className='flex flex-col items-center gap-4 pb-4'>
        <p className='bg-bande-description text-white w-full text-center'>{descriptionRapide}</p>
        <a href='/plant/1' className='flex justify-start w-full text-lg px-2 font-semibold text-emerald-950'>{nom}</a>
        <div className='flex justify-between w-full px-2'>
          {reduction !== 0 || reduction !== '0' && (
            <p className='flex items-center'>- {reduction} %</p>
          )
          }
          {reduction === 0 || reduction === '0' && (
            <p className='flex items-center'> </p>
          )
          }
          <div className='flex flex-col gap-1 text-pink-600 font-bold text-2xl'>
            {prixReduit !== 0 || prixReduit !== '0' && (
              <p className=''>{prixReduit} € </p>
            )
            }
            <p className=''>{prixInitial} € </p>
          </div>
        </div>
        <div className='w-full flex max-xl:flex-col xl:justify-around gap-2'>
          <p className='flex gap-2 justify-center items-center'>
            <img src="/icones/verifier.png" alt="" className='w-6 h-6' />
            <span className=''>{infoStock}</span>
          </p>
          <button  className="rounded-3xl flex justify-center px-5 py-2 bg-emerald-800 text-white font-bold transition-transform transform hover:scale-105 duration-300"
          onClick={() => AjoutPanier(id,nom)}>
            Ajouter au panier
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConteneurPlant;
