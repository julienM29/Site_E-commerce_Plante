import React, { useState, useCallback } from 'react';
import verifier from '../assets/icones/verifier.png'


const ConteneurPlant = ({ primaryImage, secondaryImage, altPrimary, altSecondary, nom, descriptionRapide, prixInitial, prixReduit, reduction, infoStock }) => {


  return (
    <div className='bg-white rounded-3xl flex flex-col font-semibold w-[350px] border shadow-lg'>
      <a href='/produit/1' className='group relative w-full h-80'>
        <img
          src={primaryImage}
          alt={altPrimary}
          className="rounded-t-3xl object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0"
        />
        <img
          src={secondaryImage}
          alt={altSecondary}
          className="rounded-t-xl object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
        />
      </a>

      <div className='flex flex-col items-center gap-4 pb-3'>
        <p className='bg-lime-500 text-white w-full text-center'>{descriptionRapide}</p>
        <a href='/plant/1' className='flex justify-start w-full px-2 font-semibold'>{nom}</a>
        <div className='flex justify-between w-full px-2'>
          {reduction !== 0 || reduction !== '0' && (
            <p className='flex items-center'>- {reduction} %</p>
          )
          }
          {reduction === 0 || reduction === '0' && (
            <p className='flex items-center'> </p>
          )
          }
          <div className='flex flex-col gap-1'>
            {prixReduit !== 0 || prixReduit !== '0' && (
              <p className='text-rose-600 font-semibold'>{prixReduit} </p>
            )
            }
            <p className='text-rose-600 font-semibold'>{prixInitial}</p>
          </div>
        </div>
        <div className='w-full flex max-xl:flex-col xl:justify-around gap-2'>
        <p className='flex gap-2 justify-center items-center'>
          <img src={verifier} alt="" className='w-6 h-6' />
          <span>{infoStock}</span>
        </p>
        <button className='rounded-3xl flex justify-center w-1/2 px-3 py-2 bg-lime-700 text-white font-semibold'>
          Ajouter au panier
        </button>
      </div>
      </div>
    </div>
  );
};

export default ConteneurPlant;