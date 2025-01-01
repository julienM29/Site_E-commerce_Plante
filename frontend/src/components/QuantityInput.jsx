import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

const ConteneurQuantity = ({ quantityProduct, setQuantityProduct }) => {
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
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
                <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                    />
                </svg>
            </button>
            <input
                type="number"
                id="quantity-input"
                value={localValue}
                onChange={handleChange}
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-16 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="0"
                required
            />
            <button
                type="button"
                id="increment-button"
                onClick={increment}
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
                <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                    />
                </svg>
            </button>
        </div>
    );
};

export default ConteneurQuantity;
