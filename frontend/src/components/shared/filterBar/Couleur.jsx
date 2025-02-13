import React, { useState } from 'react';

const ColorFilter = ({ setFilters, filters}) => {
  // Valeur de la couleur sélectionnée, initialement "aucune couleur"
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Liste des couleurs disponibles avec leurs classes Tailwind
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

  // Fonction pour changer la couleur sélectionnée
  const handleColorChange = (colorButton) => {
    setSelectedColor(colorButton);
    setFilters((prevState) => ({
      ...prevState,
      color: colorButton,
  }));
  };

  return (
    <div className="border-t-4">
      <button
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full px-1 py-4 text-left"
      >
        <span className="text-lg font-medium">Couleur</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      <div
        className={`grid grid-cols-4 gap-2 transition-all duration-500 ease-in-out overflow-hidden px-2 ${isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}`}
      >
        {/* Bouton pour chaque couleur */}
        {colors.map((colorButton) => (
          <button
            key={colorButton[0]}
            onClick={() => handleColorChange(colorButton[0])}
            className={`border rounded-full w-9 h-9 transition-all duration-300 ${selectedColor === colorButton[0] ? 'border-2 border-black' : ''} ${colorButton[1]} `}
            style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
