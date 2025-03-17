import React, { useEffect } from 'react';

const EsthetiqueProduct = ({ periodeFloraison, hauteurMin, hauteurMax, fleurCouper, couleur, persistant, parfum, port, largeurMin, largeurMax, couleurFeuille }) => {

    return (
        <div className='flex w-1/3 px-4 flex-col gap-4'>
            <h2 className='uppercase text-rose-700 text-2xl font-semibold'>Esthétique</h2>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                    <img src="/icones/couleur.png" alt="" className='w-10 h-10' />
                    <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Couleur</p>
                        <p>{couleur}</p>
                    </div>
                </div>
                {couleurFeuille && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/couleur.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Couleur des feuilles</p>
                            <p>{couleurFeuille}</p>
                        </div>
                    </div>)}
                <div className='flex items-center gap-2'>
                    <img src="/icones/floraison.png" alt="" className='w-10 h-10' />
                    <div className='flex flex-col gap-1'>
                        <p className='font-bold'>Période de floraison</p>
                        <p>{periodeFloraison}</p>
                    </div>
                </div>
                {(hauteurMin !== undefined || hauteurMax !== undefined) && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/hauteur.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className='font-bold'>Hauteur à maturité</p>
                            {hauteurMax === hauteurMin ? <p>{hauteurMax} cm</p> : <p>{hauteurMin} - {hauteurMax} cm</p>}
                        </div>
                    </div>
                )}
                {parfum !== 0 && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/parfum.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className='font-bold'>Parfumé</p>
                            <p>{parfum}</p>
                        </div>
                    </div>)}
                {persistant !== 0 && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/feuille_persistant.png" alt="" className='w-10 h-10' />
                        <div className='h-full flex justify-start'>
                            <p className='h-1/2 font-bold'>Feuillage persistant</p>
                        </div>
                    </div>)}
                    {fleurCouper !== 0 && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/feuille_persistant.png" alt="" className='w-10 h-10' />
                        <div className='h-full flex justify-start'>
                            <p className='h-1/2 font-bold'>Fleurs à couper</p>
                        </div>
                    </div>)}
                {port && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/port.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Port de la plante</p>
                            <p>{port}</p>
                        </div>
                    </div>)}
                {(largeurMin !== undefined || largeurMax !== undefined) && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/largeur.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Largeur de la plante</p>
                            {largeurMin === largeurMax ? <p>{largeurMax} cm</p> : <p>{largeurMin} - {largeurMax} cm</p>}
                        </div>
                    </div>)}

            </div>
        </div>
    )
}

export default EsthetiqueProduct;
