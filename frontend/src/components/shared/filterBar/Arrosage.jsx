import { useState } from 'react';

function Arrosage() {
    const [isOpen, setIsOpen] = useState(false);
    const [arrosage, setArrosage] = useState({
        elevé: false,
        faible: false,
        modéré: false,
    });

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleArrosageChange = (event) => {
        const { name, checked } = event.target;
        setArrosage((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    return (
        <div className="border-t-4">
            <button
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                className="flex justify-between items-center w-full px-1 py-4 text-left"
            >
                <span className="text-lg font-medium">Arrosage</span>
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
                className={`transition-all duration-500 ease-in-out overflow-hidden px-2 flex flex-col gap-2 ${isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0 py-0'}`}
            >
                <div className="flex items-center">
                    <input
                        id="ensoleille-checkbox"
                        type="checkbox"
                        name="ensoleille"
                        checked={arrosage.elevé}
                        onChange={handleArrosageChange}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-600 checked:bg-emerald-600 checked:border-emerald-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="ensoleille-checkbox" className="ms-2 text-sm font-medium text-gray-900">
                        élevé
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="miOmbrage-checkbox"
                        type="checkbox"
                        name="miOmbrage"
                        checked={arrosage.modéré}
                        onChange={handleArrosageChange}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-600 checked:bg-emerald-600 checked:border-emerald-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="miOmbrage-checkbox" className="ms-2 text-sm font-medium text-gray-900">
                        Modéré
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="ombrage-checkbox"
                        type="checkbox"
                        name="ombrage"
                        checked={arrosage.faible}
                        onChange={handleArrosageChange}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-600 checked:bg-emerald-600 checked:border-emerald-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="ombrage-checkbox" className="ms-2 text-sm font-medium text-gray-900">
                        Faible
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Arrosage;
