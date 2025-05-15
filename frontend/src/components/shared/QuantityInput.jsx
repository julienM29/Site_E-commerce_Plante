import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downQuantityInput, upQuantityInput, changeQuantityInput } from '../../mySlice';
import { debounce } from 'lodash';

const ConteneurQuantity = ({ panierIndex, heightInput, paddingButton, setQuantityProduct }) => {
  const { panier } = useSelector((state) => state.myState);
  const dispatch = useDispatch();

  const quantityFromRedux = panier[panierIndex]?.quantite || 0;
  const detail_panierFromRedux = panier[panierIndex]?.detail_id || 0;
  const [localQuantity, setLocalQuantity] = useState(quantityFromRedux);

  useEffect(() => {
    setLocalQuantity(quantityFromRedux);
  }, [quantityFromRedux]);

  // Déclencher la mise à jour du parent à chaque changement de localQuantity
  useEffect(() => {
    if (setQuantityProduct) {
      setQuantityProduct(localQuantity);
    }
  }, [localQuantity, setQuantityProduct]);

  const asyncChangeQuantity = async (newQuantity) => {
    try {
      await fetch(`http://localhost:3000/changeQuantityDetailPanier/${detail_panierFromRedux}/change/${newQuantity}`, {
        method: "POST",
        credentials: "include",
      });
      dispatch(changeQuantityInput({ panierIndex, newQuantity }));
    } catch (error) {
      console.error('Erreur dans l\'insert BDD QUANTITY');
    }
  };

  const asyncIncrementQuantity = async () => {
    try {
      await fetch(`http://localhost:3000/changeQuantityDetailPanier/${detail_panierFromRedux}/true/0`, {
        method: "POST",
        credentials: "include",
      });
      dispatch(upQuantityInput({ panierIndex }));
    } catch (error) {
      console.error('Erreur dans l\'insert BDD QUANTITY');
    }
  };

  const asyncDecrementQuantity = async () => {
    try {
      await fetch(`http://localhost:3000/changeQuantityDetailPanier/${detail_panierFromRedux}/false/0`, {
        method: "POST",
        credentials: "include",
      });
      dispatch(downQuantityInput({ panierIndex }));
    } catch (error) {
      console.error('Erreur dans l\'insert BDD QUANTITY');
    }
  };

  const debouncedChange = debounce((newQuantity) => {
    asyncChangeQuantity(newQuantity);
  }, 500);

  const debouncedIncrement = debounce(() => {
    asyncIncrementQuantity();
  }, 500);

  const debouncedDecrement = debounce(() => {
    asyncDecrementQuantity();
  }, 500);

  const handleChange = (e) => {
    let value = Number(e.target.value) || 1;
    if (value <= 0) value = 1;
    setLocalQuantity(value);
    debouncedChange(value);
  };

  const increment = () => {
    const newValue = localQuantity + 1;
    setLocalQuantity(newValue);
    debouncedIncrement();
  };

  const decrement = () => {
    const newValue = Math.max(1, localQuantity - 1);
    setLocalQuantity(newValue);
    debouncedDecrement();
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={decrement}
        className={`bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-2xl p-${paddingButton} h-${heightInput}`}
      >
        <svg className="w-3 h-3 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M1 1h16" />
        </svg>
      </button>

      <input
        type="number"
        value={localQuantity}
        onChange={handleChange}
        min={1}
        className={`bg-gray-50 border-y border-gray-300 h-${heightInput} text-center text-gray-900 text-sm block w-16`}
      />

      <button
        type="button"
        onClick={increment}
        className={`bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-2xl p-${paddingButton} h-${heightInput}`}
      >
        <svg className="w-3 h-3 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 1v16M1 9h16" />
        </svg>
      </button>
    </div>
  );
};

export default ConteneurQuantity;
