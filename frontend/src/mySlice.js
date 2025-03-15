import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fonction utilitaire pour calculer le total
const calculateTotal = (panier) => {
  return panier.reduce((acc, produit) => {
    return acc + (produit.prixUnitaire * produit.quantite);
  }, 0);
};

// Fonction utilitaire pour mettre à jour la quantité et le prix total d'un produit
const updateProductQuantity = (product, newQuantity) => {
  const prixUnitaire = product.prixTotal / product.quantite;
  product.quantite = newQuantity;
  product.prixTotal = parseFloat((prixUnitaire * newQuantity).toFixed(2));
};

// Fonction utilitaire pour transformer les données du panier
const transformPanier = (data) => {
  const { produits_id, noms_produits, images_urls, detail_panier_id, detail_panier_quantite, detail_panier_prix_total } = data;

  const ids = produits_id ? produits_id.split(', ').map(Number) : [];
  const noms = noms_produits ? noms_produits.split(', ') : [];
  const images = images_urls ? images_urls.split(', ') : [];
  const detailIds = detail_panier_id ? detail_panier_id.split(', ').map(Number) : [];
  const quantites = detail_panier_quantite ? detail_panier_quantite.split(', ').map(Number) : [];
  const prix = detail_panier_prix_total ? detail_panier_prix_total.split(', ').map(Number) : [];

  return ids.map((id, index) => ({
    id: Number(id),
    nom: noms[index] || "Nom inconnu",
    image: images[index] || "",
    quantite: quantites[index] || 0,
    prix: prix[index] || 0,
    detail_id: detailIds[index] || null,
  }));
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
              ? { ...item, quantite: Number(produit.quantite), prixTotal: parseFloat(produit.prixTotal.toFixed(2)) }
              : item
          );
        }
      }

      // Recalcule le total
      updateTotal(state);
    },
    removeProduit: (state, action) => {
      const produitIndex = state.panier.findIndex(p => p.id === action.payload.id);

      if (produitIndex > -1) {
        // Retirer le produit du panier
        state.panier.splice(produitIndex, 1);
      }

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
      })
      .addCase(fetchPanier.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.panier = transformPanier(action.payload);

        // Recalcule le total après récupération du panier
        updateTotal(state);
      })
      .addCase(fetchPanier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export des actions et du reducer
export const { addProduit, removeProduit, clearPanier, upQuantityInput, downQuantityInput, changeQuantityInput } = mySlice.actions;
export default mySlice.reducer;
