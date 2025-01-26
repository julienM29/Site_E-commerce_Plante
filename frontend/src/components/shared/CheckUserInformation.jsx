import React, { useState, useCallback } from 'react';

export const checkUserConnect = async (setUserConnect) => {
    try {
        const response = await fetch('http://localhost:3000/userInfo', {
            method: 'GET',
            credentials: 'include', // Important pour envoyer les cookies
        });

        const result = await response.json();

        if (result.success === true) {
            setUserConnect(true);
            console.log("🔍 Infos utilisateur récupérées :", result);
        } else {
            setUserConnect(false);
        }
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des infos utilisateur :", err);
    }
};

