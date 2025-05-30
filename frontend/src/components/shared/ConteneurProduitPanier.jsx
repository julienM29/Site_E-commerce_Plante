import React, { useState, useEffect } from 'react';
import ConteneurQuantity from './QuantityInput';
import { useDispatch, useSelector } from 'react-redux';

const ConteneurProduitPanier = ({ panierIndex, imgProduit, prixTotalProduit, nomProduit, quantiteProduit, detail_panier_id, onDelete }) => {

  const dispatch = useDispatch();
  const { panier, total, status, error } = useSelector((state) => state.myState);

  return (
    <div className="flex flex-col gap-4 md:border-b-2 max-md:border-t-2 pt-2 pb-4">
      <div className="flex items-center gap-3">
        {/* Image */}
        <img
          src={`/images/${imgProduit}`}
          alt={nomProduit}
          className="w-20 h-20 object-cover rounded-lg border-2 border-gray-500/40 hover:scale-105 transition-transform duration-300"
        />

        {/* Contenu produit */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Titre et bouton de suppression */}
          <div className='flex flex-col gap-1'>
            <div className="flex justify-between items-center">
              <p className="font-medium text-lg text-gray-900">{nomProduit}</p>
              <button
                className="p-2 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-300"
                onClick={() => onDelete(detail_panier_id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 9l-.867 10.142A2.25 2.25 0 0116.392 21H7.608a2.25 2.25 0 01-2.241-1.858L4.5 9m2.25 0V5.25A2.25 2.25 0 019 3h6a2.25 2.25 0 012.25 2.25V9M10 13v4m4-4v4M3.75 9h16.5"
                  />
                </svg>

              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500">Le pot / 2L</p>
          </div>
          {/* Quantité et prix */}
          <div className="flex justify-between items-center">
            <ConteneurQuantity panierIndex={panierIndex} heightInput="7" paddingButton="2" />
            <p className="text-xl font-bold text-emerald-600">{prixTotalProduit}€</p>
          </div>

        </div>
      </div>
    </div>

  );
};

export default ConteneurProduitPanier;
