import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import du CSS
const AdresseContent = ({ userId, changeContent, setIdAdresseToModif }) => {
    const [activeAdresse, setActiveAdresse] = useState(null);
    const [otherAdresses, setOtherAdresses] = useState([]);
    const navigate = useNavigate();  // Hook pour changer de page

    // Charger l'adresse active
    const loadActiveAdresse = async () => {
        try {
            const response = await fetch(`http://localhost:3000/loadActiveAdress/${userId}`);
            const data = await response.json();
            setActiveAdresse(data.adresse[0] || null);
        } catch (error) {
            console.error('Erreur lors du chargement des adresses:', error);
        }
    };

    // Charger les autres adresses
    const loadOtherAdresses = async () => {
        try {
            const response = await fetch(`http://localhost:3000/loadOtherAdress/${userId}`);
            const data = await response.json();
            setOtherAdresses(data.adresses || []);
        } catch (error) {
            console.error('Erreur lors du chargement des adresses:', error);
        }
    };
    const changeDefaultAdresse = async (id_adresse) => {
        try {
            const response = await fetch(`http://localhost:3000/changeActiveAdresse/${userId}/${id_adresse}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}) // ✅ Ajout d'un body JSON
            });

            const data = await response.json();
            if (data.success) {
                await loadActiveAdresse(); // 🔄 Recharge l'adresse active
                await loadOtherAdresses(); // 🔄 Recharge les autres adresses
            } else {
                console.error("Erreur lors du changement d'adresse :", data.message);
            }
        } catch (error) {
            console.error("Erreur lors du changement d'adresse :", error);
        }
    };
    const deleteAdresse = async (id_adresse) => {
        try {
            const response = await fetch(`http://localhost:3000/deleteAdresse/${id_adresse}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}) // ✅ Ajout d'un body JSON
            });

            const data = await response.json();
            if (data.success) {
                await loadActiveAdresse(); // 🔄 Recharge l'adresse active
                await loadOtherAdresses(); // 🔄 Recharge les autres adresses
            } else {
                console.error("Erreur lors du changement d'adresse :", data.message);
            }
        } catch (error) {
            console.error("Erreur lors du changement d'adresse :", error);
        }
    };
    const modifyAdresse = async (idAdresse) => {
        setIdAdresseToModif(idAdresse)
        changeContent()
    }
    useEffect(() => {
        if (userId) {
            loadActiveAdresse();
            loadOtherAdresses();
        }
    }, [userId]);

    return (
        <div className="py-1 px-4">
            <h2 className="pt-4 text-center font-semibold text-xl">Adresses de livraison</h2>

            {/* Carte pour l'ajout d'une nouvelle adresse */}
            <div className="flex gap-4 w-full border-b py-6">
                <button
                    className="rounded-xl p-3 flex flex-col gap-2 justify-center items-center w-64 h-64 border shadow-lg hover:shadow-2xl"
                    onClick={changeContent}>
                    <img
                        src="./icones/plus.png"
                        alt="Ajouter une adresse"
                        className="w-7 h-7"
                    />
                    <p className="bg-green-500 text-white rounded-2xl font-semibold py-1 px-2">Ajouter une nouvelle adresse</p>
                </button>

                {/* Carte de l'adresse active */}
                {activeAdresse ? (
                    <div className="relative rounded-xl px-5 py-6 flex flex-col gap-4 justify-start items-start w-64 h-auto border-2 shadow-lg border-green-400">
                        <div className="absolute top-3 right-3 cursor-pointer">
                            <button className="cursor-pointer"
                                onClick={() => modifyAdresse(activeAdresse.id)}>
                                <img
                                    src="./icones/stylo.png"
                                    alt="Modifier l'adresse"
                                    className="w-5 h-5 "
                                    data-tooltip-id="tooltip-modifier"
                                    data-tooltip-content="Modifier"
                                />
                            </button>
                        </div>
                        <p><strong>{activeAdresse.nom} {activeAdresse.prenom}</strong></p>
                        <p>{activeAdresse.adresse}</p>
                        <p>{activeAdresse.code_postal} {activeAdresse.ville}</p>
                        <p>{activeAdresse.pays}</p>
                        <p>{activeAdresse.telephone}</p>
                    </div>
                ) : (
                    <div className="flex px-5 justify-center">
                        <p className="text-gray-500">Vous n'avez aucune adresse par défault</p>
                    </div>
                )}
            </div>

            {/* Liste des autres adresses */}
            <div className="py-4 flex flex-col gap-4">
    <h3 className="text-xl text-center font-semibold">Autres adresses</h3>

    {/* Affichage conditionnel de la grille */}
    {otherAdresses?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[300px] overflow-y-auto">
            {otherAdresses.map((adresse, index) => (
                <div
                    key={index}
                    className="relative rounded-xl px-5 py-6 flex flex-col gap-4 justify-start items-start w-full h-auto border-2 shadow-lg hover:border-green-400"
                >
                    <div className="w-full flex justify-between items-center cursor-pointer">
                        {/* Bouton Définir par défaut */}
                        <button
                            className="px-2 py-1 rounded-xl border shadow-lg bg-green-400 text-white text-xs hover:bg-green-500"
                            onClick={() => changeDefaultAdresse(adresse.id)}
                            aria-label="Définir cette adresse comme adresse par défaut"
                        >
                            Définir par défaut !
                        </button>

                        {/* Bouton Modifier */}
                        <button
                            className="cursor-pointer"
                            onClick={() => modifyAdresse(adresse.id)}
                            aria-label="Modifier l'adresse"
                        >
                            <img
                                src="./icones/stylo.png"
                                alt="Modifier l'adresse"
                                className="w-5 h-5"
                                data-tooltip-id="tooltip-modifier"
                                data-tooltip-content="Modifier"
                            />
                        </button>

                        {/* Bouton Supprimer */}
                        <button
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => deleteAdresse(adresse.id)}
                            data-tooltip-id="tooltip-supprimer"
                            data-tooltip-content="Supprimer"
                            aria-label="Supprimer cette adresse"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* Informations sur l'adresse */}
                    <p><strong>{adresse.nom} {adresse.prenom}</strong></p>
                    <p>{adresse.adresse}</p>
                    <p>{adresse.code_postal} {adresse.ville}</p>
                    <p>{adresse.pays}</p>
                    <p>{adresse.telephone}</p>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-gray-500 text-center w-full">Vous n'avez aucune autre adresse enregistrée.</p>
    )}

    <Tooltip id="tooltip-modifier" place="top" effect="solid" />
    <Tooltip id="tooltip-supprimer" place="top" effect="solid" />
</div>


        </div>
    );

};

export default AdresseContent;
