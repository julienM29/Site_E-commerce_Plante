import { useState, useEffect } from "react";

function Arrosage({ setFilters, filters, isMobile }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleArrosageChange = (event) => {
        const { name, checked } = event.target;
        // setFilters((prevState) => ({
        //     ...prevState,
        //     arrosage: {
        //         ...prevState.arrosage,
        //         [name]: checked,  // Met à jour la propriété correspondante directement
        //     },
        // }));
        setFilters({
            arrosage: {
                ...filters.arrosage,
                [name]: checked,
            },
        })
    };
    
    return isMobile ?
    <div className='flex flex-col gap-2'>
        <span className="text-lg font-medium">Arrosage</span>

        <div
                className={`transition-all duration-500 ease-in-out overflow-hidden py-2 flex flex-col gap-2 max-h-screen opacity-100 `}
            >
                {["élevé", "modéré", "faible"].map((level) => (
                    <div key={level} className="flex items-center">
                        <input
                            id={`${level}-checkbox`}
                            type="checkbox"
                            name={level}
                            checked={filters.arrosage?.[level] || false} // Utilisation de filters directement
                            onChange={handleArrosageChange}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-600 checked:bg-emerald-600 checked:border-emerald-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor={`${level}-checkbox`} className="ms-2 text-sm font-medium text-gray-900">
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </label>
                    </div>
                ))}
            </div>
    </div>
    :
        <div className="border-t-4 py-5">
            <button
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                className="flex justify-between items-center w-full px-1 text-left"
            >
                <span className="text-lg font-medium">Arrosage</span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden px-2 flex flex-col gap-2 ${
                    isOpen ? "max-h-screen opacity-100 py-2 pt-4" : "max-h-0 opacity-0 py-0"
                }`}
            >
                {["élevé", "modéré", "faible"].map((level) => (
                    <div key={level} className="flex items-center">
                        <input
                            id={`${level}-checkbox`}
                            type="checkbox"
                            name={level}
                            checked={filters.arrosage?.[level] || false} // Utilisation de filters directement
                            onChange={handleArrosageChange}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-600 checked:bg-emerald-600 checked:border-emerald-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor={`${level}-checkbox`} className="ms-2 text-sm font-medium text-gray-900">
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
}

export default Arrosage;
