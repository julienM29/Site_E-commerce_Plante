import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const MultiRangeSlider = () => {
  // État pour les valeurs min et max
  const [values, setValues] = useState([0, 100]);

  // Fonction pour gérer les changements de valeurs
  const handleSliderChange = (newValues) => {
    // Empêcher la poignée gauche de dépasser la poignée droite de plus d'une unité
    const [minVal, maxVal] = newValues;
    const newMin = Math.min(minVal, maxVal - 1); // min ne peut pas dépasser max-1
    const newMax = Math.max(maxVal, minVal + 1); // max ne peut pas être inférieur à min+1
    setValues([newMin, newMax]);
  };

  return (
    <div className="flex flex-col gap-2">
      <Slider
        range
        min={0}
        max={100}
        step={1}
        defaultValue={values} // Valeurs initiales (min et max)
        onChange={handleSliderChange} // Fonction de gestion du changement
        trackStyle={{
          backgroundColor: '#239700', // Couleur de la track
          height: 7, // Hauteur de la track
        }}
        railStyle={{
          backgroundColor: '#7f9778', // Couleur du rail
          height: 7, // Hauteur du rail
        }}
        handleStyle={[
            {
              backgroundColor: '#239700', // Couleur de la poignée gauche
              borderColor: '#0f4300', // Bordure de la poignée gauche
              cursor: 'pointer', // Style de la poignée (on garde le pointer pour la poignée)
            },
            {
              backgroundColor: '#239700', // Couleur de la poignée droite
              borderColor: '#0f4300', // Bordure de la poignée droite
              cursor: 'pointer', // Style de la poignée (on garde le pointer pour la poignée)
            },
          ]}
          allowCross={false} // Désactive le croisement des poignées

      />

      <div className='flex w-full justify-around'>
        <p className='p-2 w-2/5 rounded-xl border flex justify-between'> <span>{values[0]}</span>  <span>€</span> </p>
        <p className='p-2 w-2/5 rounded-xl border flex justify-between'> <span>{values[1]}</span>  <span>€</span> </p>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
