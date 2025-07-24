import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapView from "./Mapview";
function App() {
  return (
    <MapView />
    // <MapContainer center={[14.6488, 121.0509]} zoom={13}>
    //   <TileLayer
    //     attribution="&copy; OpenStreetMap contributors"
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    // </MapContainer>
  );
}

export default App;
