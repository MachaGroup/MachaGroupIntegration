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

    const fetchBuildingIdFromAnotherCollection = async (referenceId) => {
        // This function fetches the buildingId field from another collection.
        try {
            const db = getFirestore();
            const referenceDoc = doc(db, 'AnotherCollection', referenceId); // Adjust 'AnotherCollection' and 'referenceId'
            const referenceSnapshot = await getDoc(referenceDoc);

            if (referenceSnapshot.exists()) {
                const buildingData = referenceSnapshot.data();
                if (buildingData.buildingId) {
                    setBuildingId(buildingData.buildingId); // Set the fetched buildingId
                    return buildingData.buildingId;
                } else {
                    console.error('buildingId field not found in the referenced document.');
                    return null;
                }
            } else {
                console.error('No such referenced document in AnotherCollection!');
                return null;
            }
        } catch (error) {
            console.error('Error fetching buildingId from another collection:', error);
            return null;
        }
    };

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
        <BuildingContext.Provider value={{ buildingId, setBuildingId, getBuildingData, fetchBuildingIdFromAnotherCollection }}>
            {children}
        </BuildingContext.Provider>
    );
};
