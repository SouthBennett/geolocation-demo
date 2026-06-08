import "./BusinessCard.css"

export default function BusinessCard({business, location}) {
  return (
    <div className="business-card">
    <h3>{business.tags?.name || "Unnamed place"}</h3>

    <p>
      Category:{" "}
      {business.tags?.amenity ||
        business.tags?.leisure ||
        business.tags?.shop ||
        "Unknown"}
    </p>

    <p>Latitude: {business.lat}</p>
    <p>Longitude: {business.lon}</p>
    <p>User Latitude: {location?.latitude}</p>
  </div>
  )
}