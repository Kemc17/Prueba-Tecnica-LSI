import React, { useCallback, useRef } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapComponent = ({
  selectedLocation,
  handleMapClick,
  showInfoWindow,
  setShowInfoWindow,
  setSelectedLocation,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  if (!isLoaded) {
    return <p>Cargando mapa...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedLocation.lat && selectedLocation.lng ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : { lat: 13.69, lng: -89.19 }} 
      zoom={selectedLocation.lat && selectedLocation.lng ? 15 : 10}
      onClick={handleMapClick}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {selectedLocation.lat && selectedLocation.lng && (
        <Marker
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onClick={() => setShowInfoWindow(true)}
        />
      )}

      {showInfoWindow && selectedLocation.lat && selectedLocation.lng && (
        <InfoWindow
          position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          onCloseClick={() => setShowInfoWindow(false)}
        >
          <div>
            <h3 className="font-semibold">{selectedLocation.name || "Sin nombre"}</h3>
            <p>{selectedLocation.address || "Dirección no disponible"}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
