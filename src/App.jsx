import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapComponent";
import LocationForm from "./components/LocationForm";
import LocationList from "./components/LocationList";
import { getStoredLocations, saveLocationsToStorage } from "./utils";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    name: "",
    lat: null,
    lng: null,
    address: "",
  });

  const [locations, setLocations] = useState(getStoredLocations());
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    saveLocationsToStorage(locations);
  }, [locations]);

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setSelectedLocation((prev) => ({
      ...prev, 
      lat,
      lng,
      address: "Buscando dirección...",
    }));

    setShowInfoWindow(false);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      const address = data.results[0]?.formatted_address || "Dirección no encontrada.";
      setSelectedLocation((prev) => ({ ...prev, address }));
      setShowInfoWindow(true);
    } catch {
      setSelectedLocation((prev) => ({ ...prev, address: "Error al obtener dirección." }));
      setShowInfoWindow(true);
    }
  };

  const saveLocation = () => {
    if (!selectedLocation.name) {
      setNameError(true);
      return;
    }
    setNameError(false);

    if (!selectedLocation.lat || !selectedLocation.lng) {
      setAddressError(true);
      return;
    }
    setAddressError(false);

    setLocations([...locations, selectedLocation]);
    setSelectedLocation({ name: "", lat: null, lng: null, address: "" });
    setShowInfoWindow(false);
  };

  const startEditing = (index, currentName) => {
    setEditingIndex(index);
    setEditingName(currentName);
  };

  const saveEditing = () => {
    const updatedLocations = [...locations];
    updatedLocations[editingIndex].name = editingName;
    setLocations(updatedLocations);
    setEditingIndex(null);
    setEditingName("");
  };

  return (
    <section className="text-gray-600 body-font relative h-screen">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 h-full">
        <div className="flex flex-col gap-4 h-full">
          <LocationForm
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            saveLocation={saveLocation}
            nameError={nameError}
            addressError={addressError}
          />
          <div className="w-full h-[400px] bg-gray-300 rounded-lg overflow-hidden">
            <MapComponent
              selectedLocation={selectedLocation}
              handleMapClick={handleMapClick}
              showInfoWindow={showInfoWindow}
              setShowInfoWindow={setShowInfoWindow}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
        </div>

        <div className="bg-white flex flex-col w-full rounded h-full max-h-screen">
          <LocationList
            locations={locations}
            startEditing={startEditing}
            saveEditing={saveEditing}
            editingIndex={editingIndex}
            editingName={editingName}
            setEditingName={setEditingName}
          />
        </div>
      </div>
    </section>
  );
};

export default App;
