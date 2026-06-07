import BusinessCard from "./BusinessCard.jsx";
import "./BusinessList.css"

export default function BusinessList({ businesses }) {
  return (
    <div className="business-list">
      {businesses.map((business) => (
        <BusinessCard
          key={business.id}
          business={business}
        />
      ))}
    </div>
    
  )
}