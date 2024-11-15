// BuildingContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

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

    return (
        <BuildingContext.Provider value={{ buildingId, setBuildingId }}>
            {children}
        </BuildingContext.Provider>
    );
};
