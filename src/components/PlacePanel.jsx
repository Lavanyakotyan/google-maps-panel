import { useState, useEffect } from "react";
import PhotoGallery from "./PhotoGallery";
import Timings from "./Timings";
import Loader from "./Loader";
import { place } from "../data/placeData";

export default function PlacePanel({ position, address, search, setSearch, onSearch }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="place-panel">
      <div className="panel-scroll">
        {/* Search Box */}
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button
          onClick={onSearch}
          style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
        >
          Search
        </button>

        {/* Photos */}
        <PhotoGallery photos={place.photos} />

        {/* Place Header */}
        <div className="place-header">
          <h2>{place.name}</h2>
          <div className="rating">⭐ {place.rating} ({place.reviews})</div>
        </div>

        {/* Address */}
        <div className="address">{place.address}</div>

        {/* Timings */}
        <Timings timings={place.timings} />

        {/* Map Coordinates */}
        <div style={{ marginTop: "16px" }}>
          <p><strong>Latitude:</strong> {position[0]}</p>
          <p><strong>Longitude:</strong> {position[1]}</p>
          <p><strong>Address:</strong> {address}</p>
        </div>
      </div>
    </div>
  );
}
