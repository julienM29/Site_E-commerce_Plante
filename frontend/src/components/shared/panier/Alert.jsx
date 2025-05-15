import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkUserConnect } from '../CheckUserInformation';
import { addProduit, fetchPanier } from '../../../mySlice';

export const AjoutPanier = async (dispatch, produit_id, nom, prixInitial, prixReduit, primaryImage, quantite) => {
  try {
    const result = await checkUserConnect();
    if (!result?.user?.id) {
      throw new Error("Utilisateur non connecté !");
    }

    const userId = result.user.id;
    let produitAjoute;
    // 🔹 Faire une requête pour ajouter en BDD
    const response = await fetch(`http://localhost:3000/ajoutPanier/${userId}/${produit_id}`, {
      method: "POST",
      credentials: "include"
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json(); // Convertir la réponse en JSON
    const insert_id = data.reponse.insertId; // ✅ Récupérer l'ID du panier (ou détail panier)
    if (data.reponse.success) {
      // toast.success(`${nom} a été ajouté au panier !`, {
      //   position: "top-right",
      //   autoClose: 3000,
      // });
      toast.success(
        <div className="flex items-center gap-3">
          <img
            src={`/images/${primaryImage}`}
            alt={nom}
            className="w-10 h-10 object-cover rounded-full border border-gray-300"
          />
          <div>
            <p className="text-sm font-semibold text-green-700">{nom}</p>
            <p className="text-xs text-gray-600">
              {quantite} exemplaire{quantite > 1 ? 's' : ''} ajouté{quantite > 1 ? 's' : ''} au panier
            </p>
          </div>
        </div>,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      
      let indexDetailPanier = null;
      if (data.reponse.method === 'update') {
        indexDetailPanier = data.reponse.indexDetailPanier;
        produitAjoute = {
          present: true,
          id: produit_id,
          nom: nom,
          image: primaryImage,
          quantite: data.reponse.newQuantite, // 🛒 Par défaut, on ajoute 1
          prixUnitaire:  prixReduit !== null ? Number(prixReduit) : Number(prixInitial), // Ternaire pour prixReduit
          prix: data.reponse.newPrixTotal,
          detail_id: data.reponse.indexDetailPanier, // ✅ Associer l'ID du détail panier

        };
      } else {
        console.log('l insert id  dans un insert panier = ', insert_id)
        produitAjoute = {
          present: false,
          id: produit_id,
          nom: nom,
          image: primaryImage,
          quantite: 1, // 🛒 Par défaut, on ajoute 1
          prixUnitaire:  prixReduit !== null ? Number(prixReduit) : Number(prixInitial), // Ternaire pour prixReduit
          prix: prixReduit !== null ? Number(prixReduit) : Number(prixInitial),
          detail_id: insert_id, // ✅ Associer l'ID du détail panier
        };
      }

      dispatch(addProduit(produitAjoute));

      return data.reponse.indexDetailPanier || null;

    } else {
      toast.error("Erreur lors de l'ajout au panier !");
    }
  } catch (error) {
    console.error("Erreur dans AjoutPanier :", error);
    toast.error("Impossible d'ajouter au panier !");
  }
};

