import React, { useState, useEffect } from "react";
import MapComponent from "./components/MapComponent";
import LocationForm from "./components/LocationForm";
import LocationList from "./components/LocationList";

const App = () => {
  
  const getStoredLocations = () => {
    try {
      const stored = localStorage.getItem("locations");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [selectedLocation, setSelectedLocation] = useState({
    name: "",
    lat: null,
    lng: null,
    address: "",
  });

  const [locations, setLocations] = useState(getStoredLocations());
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  
  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
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
    setLocations([...locations, selectedLocation]);
    setSelectedLocation({ name: "", lat: null, lng: null, address: "" });
    setShowInfoWindow(false);
  };

  return (
    <section className="text-gray-600 body-font relative h-screen">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 h-full">
        
        <div className="flex flex-col gap-4 h-full">
          
        
          <div className="w-full">
            <LocationForm
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              saveLocation={saveLocation}
            />
          </div>

          
          <div className="w-full h-[450px] bg-gray-300 rounded-lg overflow-hidden">
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
          <div className="overflow-y-auto flex-1 mt-6">
            {locations.length === 0 ? (
              <div className="border-2 border-dotted border-gray-400 rounded-lg p-8 text-center mx-auto w-3/4">
                <p className="text-gray-500 text-lg font-semibold">
                  No hay localizaciones guardadas.
                </p>
              </div>
            ) : (
              <LocationList locations={locations} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
