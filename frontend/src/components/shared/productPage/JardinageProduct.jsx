import React, { useEffect } from 'react';

const JardinageProduct = ({ rusticite, periodePlantation, culturePotBac, frequenceArrosage, mellifere, protectionFroid, vitesseCroissance, distancePlantationMin, distancePlantationMax, precaution, periodeRecolte, greffe }) => {

    return (
        <div className='flex w-1/3 items-center flex-col gap-4'>
            <h2 className='uppercase text-rose-700 text-2xl font-semibold'>Esthétique</h2>
            <div className='flex flex-col gap-2'>
            {rusticite && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/rusticite.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Rusticité</p>
                            <p>{rusticite} °c</p>
                        </div>
                    </div>)}
                    {periodePlantation && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/periode_plantation.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Période de plantation</p>
                            <p>{periodePlantation} </p>
                        </div>
                    </div>)}
                    {culturePotBac !== 0 && (
                    <div className='flex items-center gap-2'>
                    <img src="/icones/pot_bac.png" alt="" className='w-10 h-10' />
                    <div className='h-full flex justify-start'>
                        <p className='h-1/2 font-bold'>Culture en pot ou en bac</p>
                    </div>
                </div>)}
                {frequenceArrosage && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/arrosage.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Fréquence d'arrosage</p>
                            <p>{frequenceArrosage} </p>
                        </div>
                    </div>)}
                    {mellifere !== 0 && (
                    <div className='flex items-center gap-2'>
                    <img src="/icones/feuille_persistant.png" alt="" className='w-10 h-10' />
                    <div className='h-full flex justify-start'>
                        <p className='h-1/2 font-bold'>Méllifère</p>
                    </div>
                </div>)}
                {protectionFroid !== 0 && (
                    <div className='flex items-center gap-2'>
                    <img src="/icones/protection_froid.png" alt="" className='w-10 h-10' />
                    <div className='h-full flex justify-start'>
                        <p className='h-1/2 font-bold'>Plant à protéger du froid</p>
                    </div>
                </div>)}
                {vitesseCroissance && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/vitesse_croissance.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Vitesse de croissance</p>
                            <p>{vitesseCroissance} </p>
                        </div>
                    </div>)}
                    {(distancePlantationMin !== undefined || distancePlantationMax !== undefined) && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/hauteur.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className='font-bold'>Hauteur à maturité</p>
                            {distancePlantationMin === distancePlantationMax ? <p>{distancePlantationMax} cm</p> : <p>{distancePlantationMin} - {distancePlantationMax} cm</p>}
                        </div>
                    </div>
                )}
                {precaution && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/precaution.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Précaution</p>
                            <p>{precaution} </p>
                        </div>
                    </div>)}
                    {greffe && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/greffer.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Greffé</p>
                            <p>{greffe} </p>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export default JardinageProduct;
