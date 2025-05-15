import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Suggestion({ data, onClickSuggestion }) {
    const suggestionRef = useRef(null); // Création d'une référence pour le container des suggestions
    const handleMouseDown = (e) => {
        // Empêche la perte de focus si un clic vient de la suggestion
        if (suggestionRef.current && suggestionRef.current.contains(e.target)) {
            e.preventDefault();  // Empêche la propagation du clic pour gérer le focus
        }
    };

    useEffect(() => {
        // Ajoute un écouteur pour les clics en dehors des suggestions
        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    return (
        <div
            ref={suggestionRef}
            className="suggestion-container absolute left-1/2 top-[140px] transform -translate-x-1/2 z-20 bg-black/30 backdrop-blur-md rounded-xl p-4 w-11/12 md:w-[80vw] md:max-w-2xl"
        >
            <div className="bg-white p-6 rounded-xl shadow-lg  max-md:max-h-[60vh] max-h-[80vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Résultats de recherche</h2>
                {data.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {data.map((item) => (
                            <Link
                                to={`/produit/${item.id}`}
                                key={item.id}
                                className="bg-white rounded-lg shadow-lg border p-2 hover:shadow-xl transition"
                                onMouseDown={() => onClickSuggestion(item.id)}  // Utilisez onMouseDown pour éviter que le focus ne soit perdu
                            >
                                <img src={`/images/${item.image}`} alt={item.image} className="w-full h-40 object-cover rounded-t-lg" />
                                <div className="p-2">
                                    <h2 className="text-base font-semibold truncate">{item.nom}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                    :
                    <div className="flex flex-col gap-2 items-center justify-center text-gray-600 h-[200px]">
                        <p className='text-justify'>Aucun résultat trouvé.</p>
                    </div>
                }

            </div>
        </div>
    );
}

export default Suggestion;
