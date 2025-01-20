import { useState } from 'react';

function Recolte() {
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

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const handleRecolteChange = (event) => {
        const { name, checked } = event.target;
        setRecolte((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    return (
        <div className="border-t-4">
            <button
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                className="flex justify-between items-center w-full px-1 py-2 text-left"
            >
                <span className="text-lg font-medium">Récolte</span>
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
                {Object.entries(recolte).map(([month, isChecked]) => (
                    <div className="flex items-center" key={month}>
                        <input
                            id={`${month}-checkbox`}
                            type="checkbox"
                            name={month}
                            checked={isChecked}
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
