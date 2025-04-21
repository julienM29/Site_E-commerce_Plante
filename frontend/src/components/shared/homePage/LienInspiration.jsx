import React from 'react';
import { Link } from 'react-router-dom';
const LienInspiration = ({ image, texte, link }) => {


  return (
    <Link to={`${link}`} className='relative flex justify-center group'>
  <img
    src={image}
    alt=""
    className='rounded-2xl h-72 w-96 transform transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75'
  />
  <h3 className='absolute bottom-1 text-center text-white text-2xl font-bold bg-black bg-opacity-40 px-3 py-1 rounded-md transition-all duration-300 group-hover:translate-y-[-4px] group-hover:scale-105'>
    {texte}
  </h3>
</Link>



  )
};

export default LienInspiration;
