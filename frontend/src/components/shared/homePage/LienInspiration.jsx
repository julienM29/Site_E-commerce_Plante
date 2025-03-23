import React from 'react';
const LienInspiration = ({image, texte }) => {


    return (
        <a href='#' className='relative object-cover flex justify-center'>
          <img src={image} alt="" className='rounded-2xl h-72 w-96' />
          <h3 className='absolute bottom-1 text-center text-white text-2xl font-bold bg-black bg-opacity-40 px-3 py-1 rounded-md'>
            {texte}
          </h3>
        </a>
  
      )
};

export default LienInspiration;
