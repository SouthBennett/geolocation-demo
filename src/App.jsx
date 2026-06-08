import { useState, useEffect } from "react" 
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

  // Stores the list of businesses returned by the API
  const [businesses, setBusinesses] = useState([]);
  
  // Tracks whether we are currently waiting for API results
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
  
    // Don't search until we have both a location and a category
    if (!location || !selectedCategory) return;
  
    async function fetchNearbyPlaces() {
  
      // Show loading message while the search is running
      setLoading(true);
  
      // Clear any previous error messages
      setError("");
  
      // Clear old search results before starting a new search
      setBusinesses([]);
  
      // Maps our category buttons to OpenStreetMap search tags
      const categoryTags = {
        Restaurants: { key: "amenity", value: "restaurant" },
        Cafes: { key: "amenity", value: "cafe" },
        Parks: { key: "leisure", value: "park" },
        Shops: { key: "shop", value: "*" }
      };
  
      // Get the search tag that matches the selected category
      const tag = categoryTags[selectedCategory];
  
      // Build the query used by the Overpass API
      // the 1500 value is the search radius in meters
      // or 0.93 miles
      const query = `
        [out:json];
        (
          node["${tag.key}"="${tag.value}"](around:1500,${location.latitude},${location.longitude});
        );
        out;
      `;
  
      // Create the API request URL
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  
      try {
  
        // Send request to the API
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error("Could not fetch nearby places.");
        }
  
        // Convert the API response into JavaScript data
        const data = await response.json();
  
        console.log(data);
        console.log(data.elements);
  
        // Save the results 
        setBusinesses(data.elements || []);
  
      } catch (err) {
        //For the user to see error message
        setError("Something went wrong while finding nearby places.");
        console.error(err);
  
      } finally {
        // Hide loading message when request finishes
        setLoading(false);
      }
    }
    // Start the search
    fetchNearbyPlaces();
    // Run again whenever location or category changes
  }, [location, selectedCategory]);
  return (
    <main className="app">
      <section className="hero-section">
      <Header />
      {/* Allows users to request their current location */}
      <LocationButton 
        setLocation={setLocation}
        setError={setError}  
      />

      {/* Display a success message when location data exists */}
      {location && ( <p className="success-message" >Location retrieved successfully!</p>)}

    
      {/* Display geolocation errors */}
      {error && (<p className="error-message">{error}</p>)}

      <pre className="location-box"> 
        {JSON.stringify(location, null, 2)}
      </pre>
      </section>

      <section className="search-section">
      {/* Allows the user to choose a business category */}
      <CategoryButtons 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <p className="selected-category" >Selected Category: {selectedCategory}</p>
      {loading && <p className="loading-message" >Loading nearby places...</p>}

        {!loading && businesses.length === 0 && selectedCategory && (
          <p className="empty-message">No places found.</p>
        )}

        {/* Displays nearby businesses from the user */}
        <BusinessList businesses={businesses} />
      <Map />
      </section>
    </main>
    
  )
}

