import React, { useState, useCallback } from 'react';
import ConteneurQuantity from '../QuantityInput';
const ConteneurDetailProduitPanier = ({ panierIndex, produit }) => {
    const [prixUnite, setPrixUnite] = useState((produit.prix / produit.quantite));
    return (
        <tr className=" hover:bg-gray-50">
            <td className="px-4 py-4">
                <div className="flex gap-4">
                    <img
                        src={`/images/${produit.image}`}
                        alt=""
                        className="w-20 h-20 rounded-md border"
                    />
                    <div className="flex flex-col gap-2">
                        <p className="text-lg font-medium text-gray-800">
                            {produit.nom}
                        </p>
                        <p className="text-base text-gray-500">
                            Les 2 pots / 9cm de diamètre
                        </p>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <img src="icones/verifier_white.png" alt="" className="w-5 h-5" />
                            <span>En stock -</span>
                            <p className="text-gray-500">Expédition dès demain</p>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-xl font-medium text-gray-800">{prixUnite} €</td>
            <td className="px-4 py-4 text-sm text-gray-600">
                <ConteneurQuantity panierIndex={panierIndex} heightInput='9' paddingButton='3' />
            </td>
            <td className="px-4 py-4 text-xl font-medium text-gray-800">{produit.prix} €</td>
        </tr>
    );
};

export default ConteneurDetailProduitPanier;
