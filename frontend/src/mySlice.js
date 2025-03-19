import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



// Fonction utilitaire pour mettre à jour la quantité et le prix total d'un produit
const updateProductQuantity = (product, newQuantity) => {
  const prixUnitaire = product.prix / product.quantite;
  product.quantite = newQuantity;
  product.prix = parseFloat((prixUnitaire * newQuantity).toFixed(2));
};

// Fonction utilitaire pour transformer les données du panier
const transformPanier = (data) => {
  const { 
    produits_id, 
    noms_produits, 
    images_urls, 
    detail_panier_id, 
    detail_panier_quantite, 
    detail_panier_prix_total 
  } = data;

  // On s'assure que les chaînes sont bien séparées par des virgules
  const ids = produits_id ? produits_id.split(',').map(id => Number(id.trim())) : [];
  const noms = noms_produits ? noms_produits.split(',').map(nom => nom.trim()) : [];
  const images = images_urls ? images_urls.split(',').map(img => img.trim()) : [];
  const detailIds = detail_panier_id ? detail_panier_id.split(',').map(id => Number(id.trim())) : [];
  const quantites = detail_panier_quantite ? detail_panier_quantite.split(',').map(qty => Number(qty.trim())) : [];
  const prix = detail_panier_prix_total ? detail_panier_prix_total.split(',').map(prix => parseFloat(prix.trim())) : [];

  // On crée et retourne un tableau d'objets produits
  return ids.map((id, index) => ({
    id: id,
    nom: noms[index] || "Nom inconnu",  // Valeur par défaut si nom est manquant
    image: images[index] || "",        // Valeur par défaut si image est manquante
    quantite: quantites[index] || 0,   // Valeur par défaut si quantité est manquante
    prix: prix[index] || 0, 
    prixUnitaire : prix[index]/quantites[index],     // Valeur par défaut si prix est manquant
    detail_id: detailIds[index] || null, // Valeur par défaut si ID détail est manquant
  }));
};
// Fonction utilitaire pour calculer le total
const calculateTotal = (panier) => {
  return panier.reduce((acc, produit) => {
     console.log('recalcul prix total , u et Q : ', produit.prixUnitaire, 'q : ', produit.quantite)
    return acc + (produit.prixUnitaire * produit.quantite);
  }, 0);
};
// Fonction utilitaire pour mettre à jour le total
const updateTotal = (state) => {
  state.total = parseFloat(calculateTotal(state.panier).toFixed(2));
};

// Fonction asynchrone pour récupérer le panier
export const fetchPanier = createAsyncThunk('panier/fetchPanier', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3000/userInfo', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Utilisateur non authentifié');

    const result = await response.json();
    if (!result?.user?.id) throw new Error("L'utilisateur n'est pas connecté.");

    const user_id = result.user.id;

    const responsePanier = await fetch(`http://localhost:3000/getPanier/${user_id}`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!responsePanier.ok) throw new Error('Erreur lors de la récupération du panier');

    const panier = await responsePanier.json();

    if (!panier || !panier.panier) {
      return rejectWithValue('Aucun panier trouvé pour cet utilisateur.');
    }
    return panier.panier;

  } catch (error) {
    return rejectWithValue(error.message || 'Une erreur est survenue lors de la récupération du panier');
  }
});

// Création du slice
const mySlice = createSlice({
  name: 'myState',
  initialState: {
    panier: [],
    total: 0,
    status: 'idle', // "idle", "loading", "succeeded", "failed"
    error: null,
  },
  reducers: {
    addProduit: (state, action) => {
      console.log('addProduit appelé avec le produit : ', action.payload);
      const produit = action.payload;
      console.log('produit prix : ', produit.prix)
      const panierActuel = state.panier;
    
      if (!produit.present) {
        // Ajouter le produit au panier
        state.panier = [...panierActuel, produit];
      } else {
        // Trouver le produit dans le panier et mettre à jour sa quantité
        const indexProduit = panierActuel.findIndex(item => item.id === produit.id);
    
        if (indexProduit !== -1) {
          state.panier = panierActuel.map(item =>
            item.id === produit.id
              ? { 
                  ...item, 
                  quantite: Number(produit.quantite),
                  prix: produit.prix ? parseFloat(produit.prix).toFixed(2) : 0 // Vérification ici
                }
              : item
          );
        }
      }
    
      // Recalcule le total
      updateTotal(state);
    },
    removeProduit: (state, action) => {
      state.panier = state.panier.filter(p => p.id !== action.payload.id);    

      // Recalcule le total
      updateTotal(state);
    },
    upQuantityInput: (state, action) => {
      const { panierIndex } = action.payload;
      const product = state.panier[panierIndex];

      if (product) {
        updateProductQuantity(product, product.quantite + 1);
      }

      // Recalcule le total
      updateTotal(state);
    },
    downQuantityInput: (state, action) => {
      const { panierIndex } = action.payload;
      const product = state.panier[panierIndex];

      if (product && product.quantite > 0) {
        updateProductQuantity(product, product.quantite - 1);
      }

      // Recalcule le total
      updateTotal(state);
    },
    changeQuantityInput: (state, action) => {
      const { panierIndex, newQuantity } = action.payload;
      const product = state.panier[panierIndex];

      if (product) {
        updateProductQuantity(product, newQuantity);
      }

      // Recalcule le total
      updateTotal(state);
    },
    clearPanier: (state) => {
      state.panier = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPanier.pending, (state) => {
        state.status = 'loading';
        console.log("⏳ fetchPanier est en cours...");
      })
      .addCase(fetchPanier.fulfilled, (state, action) => {
        console.log("✅ fetchPanier terminé avec succès !");
        console.log("📦 Données du panier avant transformation :", action.payload);

        state.status = 'succeeded';
        state.panier = transformPanier(action.payload);

        console.log("🔄 Panier après transformation :", state.panier);

        // Recalcule le total après récupération du panier
        updateTotal(state);
        console.log("💰 Total après updateTotal :", state.total);
      })
      .addCase(fetchPanier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error("❌ fetchPanier a échoué :", action.payload);
      });
  },

});

// Export des actions et du reducer
export const { addProduit, removeProduit, clearPanier, upQuantityInput, downQuantityInput, changeQuantityInput } = mySlice.actions;
export default mySlice.reducer;
