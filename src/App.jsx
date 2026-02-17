import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet fix
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Components
import PlacePanel from "./components/PlacePanel";
import "./App.css";

// Map click handler
function ClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function App() {
  const [position, setPosition] = useState([28.6139, 77.2090]);
  const [address, setAddress] = useState("Click on the map");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`
      );
      const data = await response.json();
      setAddress(data.display_name);
    };
    fetchAddress();
  }, [position]);

  const searchLocation = async () => {
    if (!search) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
    );
    const data = await response.json();
    if (data.length > 0) {
      setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
    }
  };

  return (
    <div className="app-layout">
      {/* Map */}
      <div className="map-container">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          key={position.toString()}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>Selected Location</Popup>
          </Marker>

          <ClickHandler setPosition={setPosition} />
        </MapContainer>
      </div>

      {/* Place Details Panel */}
      <PlacePanel
        position={position}
        address={address}
        search={search}
        setSearch={setSearch}
        onSearch={searchLocation}
      />
    </div>
  );
}
