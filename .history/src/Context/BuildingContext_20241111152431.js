// BuildingContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Create Context
const BuildingContext = createContext();

// Custom Hook to Use the Context
export const useBuilding = () => useContext(BuildingContext);

export const BuildingProvider = ({ children }) => {
    const [buildingId, setBuildingId] = useState(() => {
        // Initialize buildingId from session storage if available
        return sessionStorage.getItem('buildingId') || null;
    });

    useEffect(() => {
        // Update session storage whenever buildingId changes
        if (buildingId) {
            sessionStorage.setItem('buildingId', buildingId);
        } else {
            sessionStorage.removeItem('buildingId');
        }
    }, [buildingId]);

    const getBuildingData = async () => {
        if (!buildingId) return null;

        try {
            const db = getFirestore();
            const buildingRef = doc(db, 'Buildings', buildingId);
            const buildingDoc = await getDoc(buildingRef);

            if (buildingDoc.exists()) {
                return buildingDoc.data();
            } else {
                console.error('No such building document!');
                return null;
            }
        } catch (error) {
            console.error('Error fetching building data:', error);
            return null;
        }
    };

    return (
        <BuildingContext.Provider value={{ buildingId, setBuildingId, getBuildingData }}>
            {children}
        </BuildingContext.Provider>
    );
};

