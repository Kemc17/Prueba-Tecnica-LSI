export const getStoredLocations = () => {
  try {
    const stored = localStorage.getItem("locations");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveLocationsToStorage = (locations) => {
  localStorage.setItem("locations", JSON.stringify(locations));
};
