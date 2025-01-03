import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

const ConteneurQuantity = ({ quantityProduct, setQuantityProduct, heightInput, paddingButton }) => {
    const [localValue, setLocalValue] = useState(quantityProduct);

    // Fonction debounced pour limiter les mises à jour fréquentes
    const debouncedChange = useCallback(
        debounce((value) => setQuantityProduct(value), 300), // Déclenche après 300ms d'inactivité
        []
    );

    const handleChange = (e) => {
        const value = Number(e.target.value) || 0;
        setLocalValue(value); // Met à jour l'état local immédiatement
        debouncedChange(value); // Met à jour l'état global après le délai
    };

    const increment = () => {
        const newValue = localValue + 1;
        setLocalValue(newValue);
        setQuantityProduct(newValue);
    };

    const decrement = () => {
        const newValue = Math.max(localValue - 1, 0); // Évite les valeurs négatives
        setLocalValue(newValue);
        setQuantityProduct(newValue);
    };

    return (
        <div className="flex items-center">
            <button
                type="button"
                id="decrement-button"
                onClick={decrement}
                className={`bg-gray-100 dark:bg-white dark:hover:bg-gray-300 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-2xl p-${paddingButton} h-${heightInput} focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}
            >
                <svg
                    className="w-3 h-3 text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M1 1h16"
                    />
                </svg>
            </button>
            <input
                type="number"
                id="quantity-input"
                value={localValue}
                onChange={handleChange}
                className={` bg-gray-50 border-y-2 border-gray-300 h-${heightInput} text-center text-gray-900 text-sm focus:border-blue-500 block w-16  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900`}
                placeholder="0"
                required
            />
            <button
                type="button"
                id="increment-button"
                onClick={increment}
                className={`bg-gray-100 dark:bg-white dark:hover:bg-gray-300 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-2xl p-${paddingButton} h-${heightInput} focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none`}
            >
                <svg
                    className="w-3 h-3 text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M9 1v16M1 9h16"
                    />
                </svg>
            </button>
        </div>
    );
};

export default ConteneurQuantity;
