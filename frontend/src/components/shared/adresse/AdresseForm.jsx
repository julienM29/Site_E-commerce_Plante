import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdresseAutocomplete from "./AdresseAutoComplete";

const AdresseForm = ({ userId, changeContent, idAdresseToModif }) => {
    const [adresseUser, setAdresseUser] = useState({
        prenom: '',
        nom: '',
        telephone: '',
        adresse: '',
        code_postal: '',
        ville: '',
        pays: '',
        id: '',
    });

    const [messageErreur, setMessageErreur] = useState(''); // Pour afficher l'erreur
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Hook pour changer de page
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdresseUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const submitAdressForm = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page au submit
    
        setLoading(true); // Montre un indicateur de chargement pendant l'envoi
    
        try {
            let response;
            const url = adresseUser.id 
                ? `http://127.0.0.1:3000/modifyAdresse/${userId}`
                : `http://127.0.0.1:3000/createAddress/${userId}`;
        
            response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adresseUser),
                credentials: 'include',
            });
    
            const result = await response.json();
            console.log('result : ', result)
            if (result.success) {
                changeContent();
            } else {
                setMessageErreur(result.message || 'Une erreur est survenue');
            }
        } catch (error) {
            console.error('Erreur lors du traitement de l\'adresse:', error);
            setMessageErreur('Une erreur est survenue lors du traitement de l\'adresse.');
        } finally {
            setLoading(false); // Arrête le chargement
        }
    };
    
    const loadModifyAdresse = async (idAdresse) => {
        try {
            const response = await fetch(`http://localhost:3000/loadModifyAdress/${userId}/${idAdresse}`);
            const data = await response.json();
            console.log("Données reçues :", data); // Debugging
    
            if (data.adresse && data.adresse.length > 0) { // Vérifie si le tableau n'est pas vide
                const adresseData = data.adresse[0]; // Prend le premier élément du tableau
                setAdresseUser({
                    prenom: adresseData.prenom ?? "",
                    nom: adresseData.nom ?? "",
                    telephone: adresseData.telephone ?? "",
                    adresse: adresseData.adresse ?? "",
                    code_postal: adresseData.code_postal ?? "",
                    ville: adresseData.ville ?? "",
                    pays: adresseData.pays ?? "",
                    id: adresseData.id ?? "",
                });
            } else {
                console.error("Aucune adresse trouvée !");
                setMessageErreur("Aucune adresse trouvée.");
            }
        } catch (error) {
            console.error('Erreur lors du chargement des adresses:', error);
            setMessageErreur("Erreur lors du chargement des données.");
        }
    };
    
    
    useEffect(() => {
        if (idAdresseToModif) {
            loadModifyAdresse(idAdresseToModif);
        }
    }, [idAdresseToModif, userId]);  // 🔹 Ajoute `idAdresseToModif` aux dépendances
    
    return (
        <div className="relative">
            <button className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
                onClick={changeContent}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <h2 className='pt-4 text-center font-semibold text-xl'>Ajouter une adresse</h2>
            <form
                className="w-full gap-7 flex flex-col px-6 py-8"
                onSubmit={submitAdressForm} // Utilisation de onSubmit ici
            >
                {/* Identité */}
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label htmlFor="prenom" className="font-medium">Prénom</label>
                        <input
                            type="text"
                            name="prenom"
                            id="prenom"
                            className="h-10 border rounded px-4 bg-gray-100"
                            value={adresseUser.prenom || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label htmlFor="nom" className="font-medium">Nom</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            className="h-10 border rounded px-4 bg-gray-100"
                            value={adresseUser.nom  || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Téléphone */}
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label htmlFor="telephone" className="font-medium">Téléphone</label>
                        <input
                            type="tel"
                            name="telephone"
                            id="telephone"
                            className="h-10 border rounded px-4 bg-gray-100"
                            value={adresseUser.telephone  || ""}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Autocomplete */}
                    <div className="flex flex-col gap-1 w-1/2">
                        <h2 className="font-medium">Adresse de livraison</h2>
                        <AdresseAutocomplete setAdresseUser={setAdresseUser} />


                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <h2 className="font-medium">Adresse sélectionnée</h2>
                    {adresseUser.adresse ? (
                        <p className='p-3 bg-gray-100 rounded'>
                            {adresseUser.adresse  || ""}
                        </p>
                    ) : (
                        <p className="text-gray-500 p-3 bg-gray-100 rounded">Sélectionner une adresse</p>
                    )}

                </div>
                {/* Détails Adresse */}
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 w-1/3">
                        <label htmlFor="pays" className="font-medium">Pays</label>
                        <input
                            type="text"
                            name="pays"
                            id="pays"
                            className="h-10 border rounded px-4 bg-gray-100"
                            value={adresseUser.pays  || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/3">
                        <label htmlFor="code_postal" className="font-medium">Code postal</label>
                        <input
                            type="text"
                            name="code_postal"
                            id="code_postal"
                            className="h-10 border rounded px-4 bg-gray-100"
                            value={adresseUser.code_postal  || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/3">
                        <label htmlFor="ville" className="font-medium">Ville</label>
                        <input
                            type="text"
                            name="ville"
                            id="ville"
                            className="h-10 border rounded px-4 bg-gray-100"
                            value={adresseUser.ville  || ""}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    {messageErreur && <div className="error text-red-600 font-semibold">{messageErreur}</div>} {/* Affiche l'erreur si présente */}
                    <button
                        type="submit" // Utilisation du type submit pour soumettre le formulaire
                        className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2 rounded"
                    >
                        Sauvegarder l’adresse
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdresseForm;
