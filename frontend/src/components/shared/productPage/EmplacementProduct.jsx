import React, { useEffect } from 'react';

const EmplacementProduct = ({ exposition, typeClimat, typeSol, utilisation }) => {

    return (
        <div className='caracteristique flex w-full md:w-1/3 px-4 flex-col gap-4'>
            <h2 className='uppercase text-rose-700 text-2xl font-semibold'>Emplacement</h2>
            <div className='flex flex-col gap-3'>
                {exposition && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/soleil.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Exposition</p>
                            <p>{exposition} </p>
                        </div>
                    </div>)}
                {typeClimat && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/typeClimat.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Type de climat</p>
                            <p>{typeClimat} </p>
                        </div>
                    </div>)}
                {typeSol && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/typeSol.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Type de sol</p>
                            <p>{typeSol} </p>
                        </div>
                    </div>)}
                {utilisation && (
                    <div className='flex items-center gap-2'>
                        <img src="/icones/utilisation.png" alt="" className='w-10 h-10' />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-bold'>Utilisation</p>
                            <p>{utilisation} </p>
                        </div>
                    </div>)}

            </div>
        </div>
    )
}

export default EmplacementProduct;
