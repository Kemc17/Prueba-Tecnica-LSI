import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const MapComponent = ({
  selectedLocation,
  handleMapClick,
  showInfoWindow,
  setShowInfoWindow,
}) => {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const initialCenter = {
    lat: 13.6929, 
    lng: -89.2182,
  };

  return (
    <div className="bg-gray-300 rounded-lg overflow-hidden relative h-96">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={initialCenter}
          onClick={handleMapClick}
        >
          {selectedLocation.lat && selectedLocation.lng && (
            <>
              <Marker
                position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                onClick={() => setShowInfoWindow(true)}
              />
              {showInfoWindow && (
                <InfoWindow
                  position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                  onCloseClick={() => setShowInfoWindow(false)}
                >
                  <div>
                    <h3 className="font-bold text-lg">Información</h3>
                    <p><strong>Latitud:</strong> {selectedLocation.lat}</p>
                    <p><strong>Longitud:</strong> {selectedLocation.lng}</p>
                    <p><strong>Dirección:</strong> {selectedLocation.address}</p>
                  </div>
                </InfoWindow>
              )}
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;