import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downQuantityInput, upQuantityInput, changeQuantityInput } from '../../mySlice';
import { debounce } from 'lodash'; // Si tu veux un debouncing réel

const ConteneurQuantity = ({ panierIndex, setQuantityProduct, heightInput, paddingButton }) => {
  const { panier } = useSelector((state) => state.myState);
  const dispatch = useDispatch();
    
  // Accéder directement à la quantité du panier à partir de Redux
  const quantityFromRedux = panier[panierIndex]?.quantite || 0;
  const [localQuantity, setLocalQuantity] = useState(quantityFromRedux);

  // Fonction debounced pour limiter les mises à jour fréquentes
  // Fonction debounced pour limiter les mises à jour fréquentes
  const debouncedChange = debounce((newQuantity) => {
    // Dispatcher l'action pour mettre à jour Redux après un délai
    dispatch(changeQuantityInput({ panierIndex, newQuantity }));
  }, 500); // Délai de 500ms entre chaque mise à jour

  // Gestion de la modification de l'input
  const handleChange = (e) => {
    const value = Number(e.target.value) || 0;  // Si l'utilisateur entre un nombre
    setLocalQuantity(value);  // Mise à jour de l'état local pendant que l'utilisateur tape
    debouncedChange(value);  // Mets à jour Redux après un délai (debouncing)
  };
  

  // Fonction pour augmenter la quantité
  const increment = () => {
    const newValue = quantityFromRedux + 1;
    dispatch(upQuantityInput({ panierIndex })); // Appelle l'action pour augmenter la quantité
  };

  // Fonction pour diminuer la quantité
  const decrement = () => {
    const newValue = Math.max(quantityFromRedux - 1, 0); // Évite les valeurs négatives
    dispatch(downQuantityInput({ panierIndex })); // Appelle l'action pour augmenter la quantité
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
  value={localQuantity} // Utilise l'état local pour la valeur de l'input
  onChange={handleChange}
  pattern="^(?!0(\.|\b))([1-9]\d*|\d+(\.\d+)?)"
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
