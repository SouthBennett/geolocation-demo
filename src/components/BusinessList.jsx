import BusinessCard from "./BusinessCard.jsx";
import "./BusinessList.css"

export default function BusinessList({ businesses, location }) {
  return (
    <div className="business-list">
      {businesses.map((business) => (
        <BusinessCard
          key={business.id}
          business={business}
          location={location}
        />
      ))}
    </div>
    
  )
}