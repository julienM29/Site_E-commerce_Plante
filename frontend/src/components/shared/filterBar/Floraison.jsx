import { useState, useEffect, useRef } from 'react';

function Floraison({ setFilters,filters, isMobile }) {
    const [isOpen, setIsOpen] = useState(false);
    const [floraison, setFloraison] = useState({
        Janvier: false,
        Février: false,
        Mars: false,
        Avril: false,
        Mai: false,
        Juin: false,
        Juillet: false,
        Août: false,
        Septembre: false,
        Octobre: false,
        Novembre: false,
        Décembre: false,
    });
    const prevFloraisonRef = useRef(floraison); // Initialisation avec l'état actuel de 'emplacement'

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    // const handleFloraisonChange = (event) => {
    //     const { name, checked } = event.target;
    //     setFloraison((prevState) => ({
    //         ...prevState,
    //         [name]: checked,
    //     }));
    // };
    const handleFloraisonChange = (event) => {
        const { name, checked } = event.target;       
        setFilters({
            floraison: {
                ...filters.floraison,
                [name]: checked,
            },
        })
        };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (JSON.stringify(prevFloraisonRef.current) !== JSON.stringify(floraison)) {
                setFilters((prevState) => ({
                    ...prevState,
                    floraison,
                }));
                prevFloraisonRef.current = floraison; // Mise à jour de la référence
            }
        }, 100); // Délai de 100ms avant de mettre à jour les filters

        return () => clearTimeout(timeoutId); // Nettoyage du timeout lors de la prochaine exécution
    }, [floraison, setFilters]);
    return (
        <div className="border-t-4 py-5">
            <button
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                className="flex justify-between items-center w-full px-1 text-left"
            >
                <span className="text-lg font-medium">Mois de floraison</span>
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
                className={`transition-all duration-500 ease-in-out overflow-hidden px-2 grid gap-2 ${isMobile ? ' grid-cols-3 ' : 'grid-cols-2 '} ${isOpen ? 'max-h-screen opacity-100 py-2 pt-4' : 'max-h-0 opacity-0 py-0'}`}
            >
                {Object.entries(floraison).map(([month, isChecked]) => (
                    <div className="flex items-center" key={month}>
                        <input
                            id={`${month}-checkbox`}
                            type="checkbox"
                            name={month}
                            checked={filters.floraison?.[month] || false}
                            onChange={handleFloraisonChange}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-600 checked:bg-emerald-600 checked:border-emerald-600 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor={`${month}-checkbox`} className="ms-2 text-sm font-medium text-gray-900">
                            {month.charAt(0).toUpperCase() + month.slice(1)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Floraison;
