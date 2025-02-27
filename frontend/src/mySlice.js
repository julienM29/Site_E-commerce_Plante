import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fonction asynchrone pour récupérer le panier
export const fetchPanier = createAsyncThunk('panier/fetchPanier', async (_, { rejectWithValue }) => {
  console.log('fetchPanier a été appelé');

  try {
    const response = await fetch('http://localhost:3000/userInfo', {
      method: 'GET',
      credentials: 'include',
    });
    const result = await response.json();

    const user_id = result.user.id;

    const responsePanier = await fetch(`http://localhost:3000/getPanier/${user_id}`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!responsePanier.ok) throw new Error('Erreur lors de la récupération du panier');
    const panier = await responsePanier.json();
    console.log('Panier récupéré:', panier.panier);

    return panier.panier;
  } catch (error) {
    console.log('Erreur dans fetchPanier:', error.message);
    return rejectWithValue(error.message);
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
      const produit = action.payload;
      const panierActuel = state.panier;
      if (!produit.present) {
        // Ajouter le produit au panier (en utilisant la méthode immuable)
        state.panier = [...panierActuel, produit];
        // Calculer le total du produit
        const totalProduit = produit.prix * produit.quantite;
        // state.total -= prixDetailPanierAvant;
        state.total += totalProduit;
        state.total = parseFloat(state.total.toFixed(2));
      } else {
        // Trouver le produit dans le panier
        const indexProduit = panierActuel.findIndex(item => item.id === produit.id);

        if (indexProduit !== -1) {
          // Si le produit existe, mettre à jour sa quantité et prix (immuable)
          state.panier = panierActuel.map(item =>
            item.id === produit.id
              ? { ...item, quantite: Number(produit.quantite), prix: parseFloat(produit.prix.toFixed(2)) }
              : item
          );
          // Recalculer le total global en utilisant reduce (en conservant deux décimales)
          state.total = state.panier.reduce((acc, item, index) => {
            const prix = parseFloat(item.prix) || 0;
            return acc + prix;
          }, 0);
          state.total = parseFloat(state.total.toFixed(2));
        }
      }
    },



    removeProduit: (state, action) => {
      const produitIndex = state.panier.findIndex(p => p.id === action.payload.id);

      if (produitIndex > -1) {
        // Calculer le total à retirer en tenant compte de la quantité
        const produit = state.panier[produitIndex];
        const totalProduit = produit.prix * produit.quantite;

        // Soustraire le total du produit du total global
        state.total -= totalProduit;

        // Retirer le produit du panier
        state.panier.splice(produitIndex, 1);

        // Arrondir le total à 2 décimales
        state.total = parseFloat(state.total.toFixed(2));
      }
    },
    upQuantityInput: (state, action) => {
      const { panierIndex } = action.payload;
      const product = state.panier[panierIndex];
  
      if (product) {
          let prixUnitaire = product.prix / product.quantite; // Calcule le prix unitaire actuel
          product.quantite += 1; // Augmente la quantité
          product.prix = parseFloat((prixUnitaire * product.quantite).toFixed(2)); // Met à jour le prix total
          state.total = state.panier.reduce((acc, item, index) => {
            const prix = parseFloat(item.prix) || 0;
            return acc + prix;
          }, 0);
          state.total = parseFloat(state.total.toFixed(2));
      }
  },

    // Action pour diminuer la quantité d'un produit
    downQuantityInput: (state, action) => {
      const { panierIndex } = action.payload;
      const product = state.panier[panierIndex];
      if (product && product.quantite > 0) {
        let prixUnitaire = product.prix / product.quantite; // Calcule le prix unitaire actuel
        product.quantite -= 1; // Diminuer la quantité
        product.prix = parseFloat((prixUnitaire * product.quantite).toFixed(2)); // Met à jour le prix total
      }
      state.total = state.panier.reduce((acc, item, index) => {
        const prix = parseFloat(item.prix) || 0;
        return acc + prix;
      }, 0);
      state.total = parseFloat(state.total.toFixed(2));
    },

    // Action pour changer la quantité (si tu veux aussi gérer un changement direct de valeur)
    changeQuantityInput: (state, action) => {
      const { panierIndex, newQuantity } = action.payload;
      const product = state.panier[panierIndex];
    
      console.log('on esrt dans le change input', newQuantity);
    
      if (product) {
        let prixUnitaire = product.prix / product.quantite; // Calcule le prix unitaire actuel
        product.quantite = newQuantity; // Mettre à jour la quantité directement
        product.prix = parseFloat((prixUnitaire * product.quantite).toFixed(2)); // Met à jour le prix total
      }
      state.total = state.panier.reduce((acc, item, index) => {
        const prix = parseFloat(item.prix) || 0;
        return acc + prix;
      }, 0);
      state.total = parseFloat(state.total.toFixed(2));
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
        console.log("🎯 Redux reçoit :", action.payload); // 🔍 Vérifier les données brutes

        const {
          id,
          actif,
          created_at,
          produits_id,
          noms_produits,
          images_urls,
          detail_panier_id,
          detail_panier_quantite,
          detail_panier_prix_total
        } = action.payload;

        // 🔹 Convertir les strings séparées par des virgules en tableaux
        const ids = produits_id ? produits_id.split(', ').map(Number) : [];
        const noms = noms_produits ? noms_produits.split(', ') : [];
        const images = images_urls ? images_urls.split(', ') : [];
        const detailIds = detail_panier_id ? detail_panier_id.split(', ').map(Number) : [];
        const quantites = detail_panier_quantite ? detail_panier_quantite.split(', ').map(Number) : [];
        const prix = detail_panier_prix_total ? detail_panier_prix_total.split(', ').map(Number) : [];

        // 🔹 Vérifier si les tableaux ont la même longueur pour éviter les erreurs d'index
        const panierTransforme = ids.map((id, index) => ({
          id: Number(id),
          nom: noms[index] || "Nom inconnu",
          image: images[index] || "",
          quantite: quantites[index] || 0,
          prix: prix[index] || 0,
          detail_id: detailIds[index] || null,
        }));

        console.log("🛒 Panier transformé :", panierTransforme);

        // 🔹 Mettre à jour le state Redux
        state.status = 'succeeded';
        state.panier = panierTransforme;

        // Calculer le total (sans arrondir pour l'instant)
        const total = panierTransforme.reduce((sum, produit) => sum + (produit.prix * produit.quantite), 0);

        // Arrondir le total à 2 décimales
        state.total = parseFloat(total.toFixed(2));

        // 🔹 Ajouter d'autres informations du panier si nécessaire
        state.panierInfo = {
          id,
          actif,
          created_at,
        };
      })

      .addCase(fetchPanier.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addProduit, removeProduit, clearPanier, upQuantityInput, downQuantityInput, changeQuantityInput } = mySlice.actions;
export default mySlice.reducer;
