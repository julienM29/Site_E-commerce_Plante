import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const MultiRangeSlider = ({ setFilters, filters }) => {
  const minValue = filters.minPrice ?? 0;
  const maxValue = filters.maxPrice ?? 100;
  const values = [minValue, maxValue];

  // const handleSliderChange = (newValues) => {
  //   setFilters(prevState => ({
  //     ...prevState,
  //     minPrice: newValues[0],
  //     maxPrice: newValues[1],
  //   }));
  // };
  const handleSliderChange = (newValues) => {
    // On met à jour minPrice et maxPrice directement dans l'état global
    setFilters({
      minPrice: newValues[0],
      maxPrice: newValues[1],
    });
  };
  
  return (
    <div className="flex flex-col gap-2">
      <Slider
        range
        min={0}
        max={100}
        step={1}
        value={values}  // Utilisation directe des filtres
        onChange={handleSliderChange} // Met à jour les filtres
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
