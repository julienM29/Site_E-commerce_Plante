import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"; // Import du CSS
const AdresseContent = ({ userId, changeContent, setIdAdresseToModif, isMobile }) => {
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
  useEffect(() => {
    if (userId) {
      loadActiveAdresse();
      loadOtherAdresses();
    }
  }, [userId]);

  return (
    <div className="max-md:py-4 py-4 px-4">
      <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} pt-4 text-center font-semibold`}>
        Adresse de livraison
      </h2>

      {/* Ajout d'une nouvelle adresse */}
      <div className={`border-b-2 py-6 w-full ${isMobile ? 'flex-col flex items-center gap-6' : 'flex gap-4'}`}>
        <button
          className={`${isMobile ? 'w-4/5 py-5' : 'w-60 h-auto p-3'} rounded-xl bg-white transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 border flex flex-col gap-4 justify-center items-center`}
          onClick={() => changeContent(null)}
        >
          <img src="./icones/plus.png" alt="Ajouter une adresse" className="w-7 h-7" />
          <p className="bg-green-500 hover:bg-green-600 text-white text-sm rounded-2xl font-semibold py-2 px-3 transition-colors duration-200 text-center">
            Ajouter une nouvelle adresse
          </p>
        </button>

        {/* Adresse par défaut */}
        {activeAdresse ? (
          <div className={`relative bg-white border-l-4 border border-l-green-500 rounded-xl px-3 py-6 flex flex-col gap-4 items-start ${isMobile ? 'w-4/5' : 'w-60'}  `}>
            <button
              onClick={() => changeContent(activeAdresse.id)}
              className="absolute top-3 right-3"
              aria-label="Modifier l'adresse par défaut"
            >
              <img src="./icones/stylo.png" alt="Modifier" className="w-5 h-5" data-tooltip-id="tooltip-modifier" data-tooltip-content="Modifier" />
            </button>
            <p className="bg-green-500 text-white text-sm py-2 px-4 rounded-xl shadow">
              Adresse par défaut
            </p>
            <div className="flex flex-col gap-1">
                
            <p className="mb-2"><strong>{activeAdresse.nom} {activeAdresse.prenom}</strong></p>
            <p>{activeAdresse.adresse}</p>
            <p>{activeAdresse.code_postal} {activeAdresse.ville}</p>
            <p>{activeAdresse.pays}</p>
            <p>{activeAdresse.telephone}</p>
            </div>

          </div>
        ) : (
          <p className="text-gray-500">Vous n'avez aucune adresse par défaut.</p>
        )}
      </div>

      {/* Autres adresses */}
      <div className="pt-4 flex flex-col gap-4">
        <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} text-center font-semibold`}>
          Autres adresses enregistrées
        </h3>

        {otherAdresses?.length > 0 ? (
          <div className={`grid ${isMobile ? 'grid-cols-1 place-items-center' : 'sm:grid-cols-2 md:grid-cols-3'} gap-6 max-h-[29vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-100`}>
            {otherAdresses.map((adresse, index) => (
              <div key={index} className={`relative bg-white rounded-xl px-3 py-6 flex flex-col gap-4 justify-start items-start ${isMobile ? 'w-4/5' : 'w-60'} border-2 shadow hover:border-green-400 transition-all duration-300`}>
                <div className="w-full flex justify-between items-center gap-2">
                  <button
                    disabled={activeAdresse?.id === adresse.id}
                    onClick={() => changeDefaultAdresse(adresse.id)}
                    className={`text-sm font-semibold py-2 px-4 rounded-xl transition
                          ${activeAdresse?.id === adresse.id
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"}`}
                  >
                    Définir par défaut
                  </button>

                  <button onClick={() => changeContent(adresse.id)} aria-label="Modifier l'adresse">
                    <img src="./icones/stylo.png" alt="Modifier" className="w-5 h-5" data-tooltip-id="tooltip-modifier" data-tooltip-content="Modifier" />
                  </button>

                  <button onClick={() => deleteAdresse(adresse.id)} aria-label="Supprimer cette adresse" className="text-gray-600 hover:text-red-600" data-tooltip-id="tooltip-supprimer" data-tooltip-content="Supprimer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="mb-2"><strong>{adresse.nom} {adresse.prenom}</strong></p>
                  <p>{adresse.adresse}</p>
                  <p>{adresse.code_postal} {adresse.ville}</p>
                  <p>{adresse.pays}</p>
                  <p>{adresse.telephone}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Vous n'avez aucune autre adresse enregistrée.</p>
        )}

        <Tooltip id="tooltip-modifier" place="top" effect="solid" />
        <Tooltip id="tooltip-supprimer" place="top" effect="solid" />
      </div>
    </div>
  );


};

export default AdresseContent;
