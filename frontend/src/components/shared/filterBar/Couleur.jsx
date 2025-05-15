import React, { useState } from 'react';
const ColorFilter = ({ setFilters, filters, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleColorChange = (colorButton) => {
    setFilters({
      color: filters.color === colorButton ? null : colorButton
  })
  };
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const colors = [
    ['Blanc', 'bg-white'],
    ['Bleu', 'bg-blue-500'],
    ['Jaune', 'bg-yellow-500'],
    ['Multicolor', 'bg-[url("/icones/multicolore.png")] bg-cover'],
    ['Noir', 'bg-black'],
    ['Orange', 'bg-orange-500'],
    ['Rose', 'bg-pink-500'],
    ['Violet', 'bg-purple-500'],
    ['Rouge', 'bg-red-500'],
    ['Saumon', 'bg-orange-200'],
    ['Vert', 'bg-green-500'],
  ];

  // const handleColorChange = (colorButton) => {
  //   setFilters((prevState) => ({
  //     ...prevState,
  //     color: prevState.color === colorButton ? null : colorButton,
  //   }));
  // };
  return isMobile ?
      <div
        className={`grid grid-cols-6 gap-4 transition-all duration-500 ease-in-out overflow-hidden px-2  max-h-screen opacity-100 py-2 w-full`}
      >
        {colors.map(([colorName, colorClass]) => (
          <button
            key={colorName}
            onClick={() => handleColorChange(colorName)}
            className={`border rounded-full w-9 h-9 transition-all duration-300 ${filters.color === colorName ? 'border-2 border-black' : ''
              } ${colorClass}`}
            style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></button>
        ))}
      </div>
    :
    <div className="border-t-4 py-5">
      <button
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full px-1 text-left"
      >
        <span className="text-lg font-medium">Couleur</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div
        className={`grid grid-cols-4 gap-2 transition-all duration-500 ease-in-out overflow-hidden px-2 ${isOpen ? 'max-h-screen opacity-100 py-2 pt-4' : 'max-h-0 opacity-0 py-0'}`}
      >
        {colors.map(([colorName, colorClass]) => (
          <button
            key={colorName}
            onClick={() => handleColorChange(colorName)}
            className={`border rounded-full w-9 h-9 transition-all duration-300 ${filters.color === colorName ? 'border-2 border-black' : ''
              } ${colorClass}`}
            style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></button>
        ))}
      </div>
    </div>


};

export default ColorFilter;
