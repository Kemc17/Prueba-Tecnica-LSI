import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import LocationForm from "./components/LocationForm";
import LocationList from "./components/LocationList";

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    name: "",
    lat: null,
    lng: null,
    address: "",
  });

  const [locations, setLocations] = useState([]);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

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
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      setSelectedLocation((prev) => ({ ...prev, address: "Error al obtener dirección." }));
      setShowInfoWindow(true);
    }
  };

  const saveLocation = () => {
    if (selectedLocation.name && selectedLocation.lat && selectedLocation.lng) {
      setLocations([...locations, selectedLocation]); 
      setSelectedLocation((prev) => ({
        ...prev, 
        name: "", 
      }));
      setShowInfoWindow(false); 
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      
      <div className="container px-5 py-10 mx-auto grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8">
      
        <div className="bg-gray-300 rounded-lg overflow-hidden relative h-96 lg:h-full">
          <MapComponent
            selectedLocation={selectedLocation}
            handleMapClick={handleMapClick}
            showInfoWindow={showInfoWindow}
            setShowInfoWindow={setShowInfoWindow}
          />
        </div>

        <div className="bg-white flex flex-col w-full p-6 rounded shadow-md">
          <LocationForm
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            saveLocation={saveLocation}
          />
        </div>
      </div>

      <LocationList locations={locations} />
    </section>
  );
};

export default App;