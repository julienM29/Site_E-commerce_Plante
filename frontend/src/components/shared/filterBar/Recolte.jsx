import { useState, useEffect, useRef } from 'react';

function Recolte({ setFilters, filters, isMobile }) {
    const [isOpen, setIsOpen] = useState(false);
    const [recolte, setRecolte] = useState({
        janvier: false,
        février: false,
        mars: false,
        avril: false,
        mai: false,
        juin: false,
        juillet: false,
        aout: false,
        septembre: false,
        octobre: false,
        novembre: false,
        décembre: false,
    });
    const prevRecolteRef = useRef(recolte); // Initialisation avec l'état actuel de 'emplacement'

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    // const handleRecolteChange = (event) => {
    //     const { name, checked } = event.target;
    //     setRecolte((prevState) => ({
    //         ...prevState,
    //         [name]: checked,
    //     }));
    // };
    const handleRecolteChange = (event) => {
        const { name, checked } = event.target;       
        setFilters({
            recolte: {
                ...filters.recolte,
                [name]: checked,
            },
        })
        };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (JSON.stringify(prevRecolteRef.current) !== JSON.stringify(recolte)) {
                setFilters((prevState) => ({
                    ...prevState,
                    recolte,
                }));
                prevRecolteRef.current = floraison; // Mise à jour de la référence
            }
        }, 100); // Délai de 100ms avant de mettre à jour les filters

        return () => clearTimeout(timeoutId); // Nettoyage du timeout lors de la prochaine exécution
    }, [recolte, setFilters]);
    return (
        <div className="border-t-4 py-5">
            <button
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                className="flex justify-between items-center w-full px-1 text-left"
            >
                <span className="text-lg font-medium">Mois de récolte</span>
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
                className={`transition-all duration-500 ease-in-out overflow-hidden px-2 grid ${isMobile ? ' grid-cols-3 ' : ' grid-cols-2 '} gap-2 ${isOpen ? 'max-h-screen opacity-100 py-2 pt-4' : 'max-h-0 opacity-0 py-0'}`}
            >
                {Object.entries(recolte).map(([month, isChecked]) => (
                    <div className="flex items-center" key={month}>
                        <input
                            id={`${month}-checkbox`}
                            type="checkbox"
                            name={month}
                            checked={filters.recolte?.[month] || false}
                            onChange={handleRecolteChange}
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

export default Recolte;
