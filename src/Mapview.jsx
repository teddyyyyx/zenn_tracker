import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
// import UseVehicleTracker from "../hooks/UseVehicleTracker";
import UseVehicleTracker from "./hooks/UseVehicleTracker";
import { useEffect } from "react";

// Custom icon for vehicle
const vehicleIcon = new L.Icon({
  iconUrl: "/icons/vehicle_topview.png",
  iconSize: [50, 50],
  iconAnchor: [16, 32],
});

function VehicleMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position); // center map on vehicle
  }, [position, map]);

  return (
    <Marker position={position} icon={vehicleIcon}>
      <Popup>Vehicle is here</Popup>
    </Marker>
  );
}

export default function MapView() {
  const { position, trail } = UseVehicleTracker(); // live position and trail

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "50rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <VehicleMarker position={position} icon={vehicleIcon} />

        {/* THIS IS WHERE YOU UPDATE */}
        {trail.length > 1 &&
          trail.every(
            (p) =>
              Array.isArray(p) && p.length === 2 && typeof p[0] === "number"
          ) && <Polyline positions={trail} color="blue" />}
      </MapContainer>
    </div>
  );
}
