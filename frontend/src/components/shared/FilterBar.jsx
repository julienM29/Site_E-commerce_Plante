import React, { useState, useCallback } from 'react';
import Accordeon from './filterBar/Accordeon';
import ColorFilter from './filterBar/Couleur';
import Exposition from './filterBar/Exposition';
import Feuillage from './filterBar/feuillage';
import Parfum from './filterBar/Parfum';
import Mellifere from './filterBar/Mellifere';
import Vivace from './filterBar/Vivace';
import Arrosage from './filterBar/Arrosage';
import Emplacement from './filterBar/Emplacement';
import Floraison from './filterBar/Floraison';
import Recolte from './filterBar/Recolte';
import { useSearchParams } from "react-router-dom";

const FilterBar = ({setFilters, filters}) => {
      
    return (
<div className="w-1/5 flex flex-col py-5 px-4 rounded-2xl border shadow-2xl bg-white self-start max-w-[313px]">

            <p className='text-rose-700 text-3xl font-semibold pb-4 '>Filtre</p>
            <ul>
                < Accordeon setFilters={setFilters} filters={filters}/>
                < ColorFilter setFilters={setFilters} filters={filters}/>
                < Exposition setFilters={setFilters} filters={filters}/>
                < Feuillage setFilters={setFilters} filters={filters}/>
                < Parfum />
                < Mellifere />
                < Vivace />
                < Arrosage setFilters={setFilters} filters={filters}/>
                < Emplacement setFilters={setFilters} filters={filters}/>
                < Floraison setFilters={setFilters} filters={filters}/>
                < Recolte setFilters={setFilters} filters={filters}/>
            </ul>
        </div>
    )
};

export default FilterBar;
