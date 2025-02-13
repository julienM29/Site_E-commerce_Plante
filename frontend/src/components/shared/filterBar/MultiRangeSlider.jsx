import React, { useState, useCallback, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { debounce } from "lodash";

const MultiRangeSlider = ({ setFilters }) => {
  // État pour les valeurs min et max
  const [values, setValues] = useState([0, 100]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  // Fonction exécutée après le debounce
  const onFinalChange = useCallback(
    debounce((newValues) => {
      console.log("Valeurs finales appliquées :", newValues);
      setFilters((prevState) => ({
        ...prevState,
        minPrice: newValues[0],
        maxPrice: newValues[1],
      }));
    }, 500),
    [setFilters]
  );

  // Met à jour les filtres avec un effet pour plus de fiabilité
  useEffect(() => {
    onFinalChange(values);
  }, [values, onFinalChange]);

  // Fonction pour gérer les changements de valeurs
  const handleSliderChange = (newValues) => {
    // Empêcher la poignée gauche de dépasser la poignée droite de plus d'une unité
    const [minVal, maxVal] = newValues;
    const newMin = Math.min(minVal, maxVal - 1);
    const newMax = Math.max(maxVal, minVal + 1);
    setValues([newMin, newMax]);
  };

  return (
    <div className="flex flex-col gap-2">
      <Slider
        range
        min={minValue}
        max={maxValue}
        step={1}
        value={values} // Utiliser `value` pour refléter l'état en temps réel
        onChange={handleSliderChange} // Gestion du changement
        trackStyle={{ backgroundColor: '#239700', height: 7 }}
        railStyle={{ backgroundColor: '#7f9778', height: 7 }}
        handleStyle={[
          { backgroundColor: '#239700', borderColor: '#0f4300', cursor: 'pointer' },
          { backgroundColor: '#239700', borderColor: '#0f4300', cursor: 'pointer' },
        ]}
        allowCross={false}
      />

      <div className="flex w-full justify-around">
        <p className="p-2 w-2/5 rounded-xl border flex justify-between">
          <span>{values[0]}</span> <span>€</span>
        </p>
        <p className="p-2 w-2/5 rounded-xl border flex justify-between">
          <span>{values[1]}</span> <span>€</span>
        </p>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
