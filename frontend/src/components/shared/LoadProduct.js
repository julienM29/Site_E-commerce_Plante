export const searchSelection = async (setDataSelectionPlants) => {
    try {
        const response = await fetch(`http://localhost:3000/loadSelectionProduct`);
        const data = await response.json();
        setDataSelectionPlants(data.products || []);
    } catch (error) {
        console.error('Erreur lors du chargement des plantes:', error);
    }
};