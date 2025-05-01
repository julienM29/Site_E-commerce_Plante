export const fetchTypes  = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3000/loadType');
        const data = await response.json();
        return data.types || [];
    } catch (error) {
        console.error('Erreur lors du chargement des types:', error);
    }
};

export const fetchProductsByParams  = async (filters) => {
    try {
        const response = await fetch(`http://localhost:3000/searchByParams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters), // Corps dynamique basé sur les filtres
            credentials: "include"
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.products || []
    } catch (error) {
        console.error('Erreur lors du chargement des plantes:', error);
    } 
};