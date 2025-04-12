import { useState, useEffect, useRef } from "react";

const AdresseAutocomplete = ({setAdresseUser }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hasSelected = useRef(false); // Empêche un re-render inutile après sélection

  useEffect(() => {
    if (query.length < 3 || hasSelected.current) {
      setSuggestions([]);
      hasSelected.current = false; // Réinitialise après la sélection
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchAddresses(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchAddresses = async (search) => {
    setLoading(true);
    setError("");
    console.log('search : ', search);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${search}&format=json&addressdetails=1&limit=7&countrycodes=fr`
      );
      const data = await response.json();
      
      if (data.length === 0) {
        setError("Aucune adresse trouvée");
      }
      setSuggestions(data);
    } catch (err) {
      setError("Erreur lors du chargement des adresses");
    }

    setLoading(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          hasSelected.current = false; // Permet de relancer une recherche uniquement si l'utilisateur tape
          setQuery(e.target.value);
        }}
        onBlur={() => setTimeout(() => setSuggestions([]), 200)}
        placeholder="Entrez votre adresse..."
        className="w-full px-4 py-2 border rounded-lg"
      />

      {loading && <p className="text-sm text-gray-500 mt-1">Recherche...</p>}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1">
          {suggestions.map((address, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                hasSelected.current = true; // Indique qu'une adresse a été sélectionnée
                setQuery(address.display_name);
                setSuggestions([]);
                setAdresseUser((prevState) => ({
                    ...prevState, // Garde les anciennes valeurs
                    adresse: 
                        address.address.road 
                        ?? address.address.village 
                        ?? address.address.town 
                        ?? address.address.city 
                        ?? address.name 
                        ?? "Adresse inconnue", // Mets à jour le champ 'adresse'
                    code_postal: 
                        address.address.postcode ?? "",
                    pays: 
                        address.address.country 
                        ?? address.address.state 
                        ?? address.address.region 
                        ?? "Pays inconnu",
                    ville:
                        address.address.city 
                        ?? address.address.village 
                        ?? address.address.town 
                        ?? "Ville inconnue",
                  }));
              }}
            >
              {address.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdresseAutocomplete;
