import React, { useEffect } from 'react';

const CaracteristiqueProduit = ({ couleur, debutFloraison, finFloraison, hauteurMax, Parfum, DistancePlantation, PeriodePlantation, FrequenceArrosage, Exposition }) => {
        
    return (
          <div className='bg-white py-6 flex flex-col w-full items-center gap-4 border'>
            <div className='flex w-[60%] flex-col gap-8 '>
              <h2 className='w-full text-start text-4xl font-semibold text-green-800'>Caractéristiques</h2>
              <div className='w-full flex divide-x-2'>
                <div className='flex w-1/3 items-center flex-col gap-4'>
                  <h2 className='uppercase text-rose-700 text-2xl font-semibold'>Esthétique</h2>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                      <img src="/icones/couleur.png" alt="" className='w-10 h-10' />
                      <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Couleur</p>
                        <p>{couleur}</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <img src="/icones/floraison.png" alt="" className='w-10 h-10' />
                      <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Période de floraison</p>
                        <p>{debutFloraison} - {finFloraison}</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <img src="/icones/hauteur.png" alt="" className='w-10 h-10' />
                      <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Hauteur à maturité</p>
                        <p>{hauteurMax} cm</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <img src="/icones/parfum.png" alt="" className='w-10 h-10' />
                      <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Parfumé</p>
                        <p>{Parfum}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex w-1/3 items-center flex-col gap-4'>
                  <h2 className='uppercase text-rose-700 text-2xl font-semibold'>Jardinage</h2>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                      <img src="/icones/ecart.png" alt="" className='w-10 h-10' />
                      <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Distance de plantation</p>
                        <p>{DistancePlantation} cm</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <img src="/icones/plantation.png" alt="" className='w-10 h-10' />
                      <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Période de plantation</p>
                        <p>{PeriodePlantation} </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <img src="/icones/arrosage.png" alt="" className='w-10 h-10' />
                      <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Fréquence d'arrosage</p>
                        <p>{FrequenceArrosage} </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex w-1/3 items-center flex-col gap-4'>
                  <h2 className='uppercase text-rose-700 text-2xl font-semibold'>Emplacement</h2>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-2'>
                      <img src="/icones/soleil.png" alt="" className='w-10 h-10' />
                      <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Exposition</p>
                        <p>{Exposition}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

export default CaracteristiqueProduit;
