import { useState } from "react" 
import Header from "./components/Header.jsx"
import LocationButton from "./components/LocationButton.jsx"
import CategoryButtons from "./components/CategoryButtons.jsx"
import BusinessList from "./components/BusinessList.jsx"
import Map from "./components/Map.jsx"

export default function App() {

  // Stores the user's coordinates once location is granted
  const [location, setLocation] = useState(null);

  //Stores any geolocation-related error message
  const [error, setError] = useState("");

  // Stores the currently selected buisness category
  const [selectedCategory, setSelectedCategory] = useState("");
  
  return (
    <main>
      <Header />
      {/* Allows users to request their current location */}
      <LocationButton 
        setLocation={setLocation}
        setError={setError}  
      />

      {/* Display a success message when location data exists */}
      {location && (<p>Location retrieved successfully!</p>)}

      {/* Display geolocation errors */}
      {error && (<p>{error}</p>)}

      <pre>
        {JSON.stringify(location, null, 2)}
      </pre>
      {/* Allows the user to choose a business category */}
      <CategoryButtons 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BusinessList />
      <Map />
    </main>
    
  )
}

