import connection from "../config/database.js";

export const addAdresse = async (id_user, adresse, defaultAdress) => {
    try {
        const requeteAdresseExistante = `
            SELECT COUNT(*) as count
            FROM adresse_livraison
            WHERE adresse = ?
              AND code_postal = ?
              AND ville = ? 
              AND pays = ?
              AND prenom = ?
              AND nom = ?
              AND id_user = ?
            `;
        const adresseExistante = await connection.promise().query(requeteAdresseExistante, [adresse.adresse, adresse.code_postal, adresse.ville, adresse.pays, adresse.prenom, adresse.nom, id_user]);
        console.log('adresseExistante : ', adresseExistante[0][0].count)
        if (adresseExistante[0][0].count > 0) {
            return { success: false, message: 'Adresse existante' }
        }
        const [rows] = await connection.promise().query(
            'INSERT INTO adresse_livraison (id_user, adresse, code_postal, ville, pays,telephone, nom, prenom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [id_user, adresse.adresse, adresse.code_postal, adresse.ville, adresse.pays, adresse.telephone, adresse.nom, adresse.prenom]
        );
        const newAdresseId = rows.insertId;

        if (newAdresseId && defaultAdress) {
            await fetch(`http://localhost:3000/changeActiveAdresse/${id_user}/${newAdresseId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}) // ✅ Ajout d'un body JSON
            });
        }
        if (newAdresseId) {
            console.log('Adresse ajoutée');
            return { success: true, message: 'Adresse ajoutée avec succès' };
        } else {
            return { success: false, message: 'erreur ajout adresse' };

        }
    } catch (error) {
        console.error("Erreur lors de l'ajout à la wishlist :", error);
        throw new Error("Impossible d'ajouter l'élément à la wishlist.");
    }
};
export const modifyAdresse = async (id_user, adresse, defaultAdress) => {
    try {
        const requeteAdresseExistante = `
            SELECT COUNT(*) as count,
            CASE 
                WHEN a.id = u.id_adresse_active THEN TRUE 
                ELSE FALSE 
            END AS 'default'
            FROM adresse_livraison a
            inner join utilisateurs u on u.id = a.id_user
            WHERE 
            a.id = ?
              AND id_user = ?
            `;
        const adresseExistante = await connection.promise().query(requeteAdresseExistante, [adresse.id, id_user]);
        console.log('adresseExistante : ', adresseExistante[0][0].count)

        await connection.promise().query(
            'UPDATE site_kerisnel.adresse_livraison SET adresse= ?, code_postal=?, ville=?, pays=?, prenom=?, nom=?, telephone=? WHERE id=? AND id_user = ?; ',
            [adresse.adresse, adresse.code_postal, adresse.ville, adresse.pays, adresse.prenom, adresse.nom, adresse.telephone, adresse.id, id_user,]
        );
        if (adresseExistante[0][0].default && !defaultAdress) {
            // Si c'était l'adresse par défaut mais que l'utilisateur la désactive
            await connection.promise().query(`
                UPDATE site_kerisnel.utilisateurs
                SET id_adresse_active = NULL
                WHERE id = ?
            `, [id_user]);
        } else if (!adresseExistante[0][0].default && defaultAdress) {
            // Si ce n'était pas l'adresse par défaut mais qu'on la rend par défaut
            await connection.promise().query(`
                UPDATE site_kerisnel.utilisateurs
                SET id_adresse_active = ?
                WHERE id = ?
            `, [adresse.id, id_user]);
        }

        console.log('Adresse ajoutée');
        return { success: true, message: 'Adresse ajoutée avec succès' };

    } catch (error) {
        console.error("Erreur lors de l'ajout à la wishlist :", error);
        throw new Error("Impossible d'ajouter l'élément à la wishlist.");
    }
};
export const loadActivAdresse = async (id_user) => {
    // console.log('je passe ici, l id est : ' , id_user)
    try {
        const requeteAdresseActive = `
            SELECT a.*
                FROM site_kerisnel.adresse_livraison a
                INNER JOIN utilisateurs u on u.id = a.id_user 
            WHERE id_user = ? 
                and u.id_adresse_active = a.id;
            `;
        const adresseActive = await connection.promise().query(requeteAdresseActive, [id_user]);
        if (adresseActive.length <= 0) {
            return { success: false, message: 'Adresse existante' }
        }

        return { success: true, adresseActive: adresseActive[0] };

    } catch (error) {
        console.error("Erreur lors de l'ajout à la wishlist :", error);
        throw new Error("Impossible d'ajouter l'élément à la wishlist.");
    }
};
export const loadOtherAdresses = async (id_user) => {
    try {
        const requeteAdresseActive = `
            SELECT a.* 
            FROM site_kerisnel.adresse_livraison a 
            INNER JOIN utilisateurs u ON u.id = a.id_user 
            WHERE a.id_user = ? 
 AND (u.id_adresse_active IS NULL OR u.id_adresse_active != a.id);
         `;

        // Exécution de la requête avec Promise
        const [adresses] = await connection.promise().query(requeteAdresseActive, [id_user]);
        // Vérification si des adresses ont été trouvées
        if (adresses.length === 0) {
            return { success: false, message: 'Aucune adresse non active trouvée' };
        }

        return { success: true, adresses: adresses };

    } catch (error) {
        console.error("Erreur lors du chargement des adresses non actives :", error);
        return { success: false, message: 'Erreur lors du traitement des adresses' };
    }
};
export const loadModifyAdresse = async (id_user, id_adresse) => {
    try {
        const requeteAdresseActive = `
            SELECT a.*,
            CASE 
                WHEN a.id = u.id_adresse_active THEN TRUE 
                ELSE FALSE 
            END AS "default" 
            FROM site_kerisnel.adresse_livraison a 
            INNER JOIN utilisateurs u ON u.id = a.id_user 
            WHERE a.id_user = ? 
            AND a.id = ?;
        `;

        // Exécution de la requête avec Promise
        const [adresse] = await connection.promise().query(requeteAdresseActive, [id_user, id_adresse]);
        // Vérification si des adresses ont été trouvées
        if (adresse.length === 0) {
            return { success: false, message: 'Aucune adresse non active trouvée' };
        }
        return { success: true, adresse: adresse };

    } catch (error) {
        console.error("Erreur lors du chargement des adresses non actives :", error);
        return { success: false, message: 'Erreur lors du traitement des adresses' };
    }
};
export const changeActiveAdresse = async (id_user, id_adresse) => {
    try {
        const requeteAdresseActive = `
            UPDATE site_kerisnel.utilisateurs
            SET id_adresse_active = ?
            WHERE id = ?;
        `;

        const [result] = await connection.promise().query(requeteAdresseActive, [id_adresse, id_user]);

        if (result.affectedRows === 0) {
            return { success: false, message: "Aucune mise à jour effectuée, l'utilisateur n'existe pas" };
        }

        return { success: true };

    } catch (error) {
        console.error("Erreur lors du changement d'adresse active :", error);
        return { success: false, message: "Erreur lors du traitement de l'adresse" };
    }
};
export const deleteAdresse = async (id_adresse) => {
    try {
        const requeteDelete = `
           DELETE FROM site_kerisnel.adresse_livraison
                WHERE id=?;
        `;

        const [result] = await connection.promise().query(requeteDelete, [id_adresse]);

        if (result.affectedRows === 0) {
            return { success: false, message: "La suppression a échoué" };
        }

        return { success: true };

    } catch (error) {
        console.error("Erreur lors du changement d'adresse active :", error);
        return { success: false, message: "Erreur lors du traitement de l'adresse" };
    }
};