import { useState, useEffect } from "react" 
import Header from "./components/Header.jsx"
import LocationButton from "./components/LocationButton.jsx"
import CategoryButtons from "./components/CategoryButtons.jsx"
import BusinessList from "./components/BusinessList.jsx"

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

  // For live demo
  const [steps, setSteps] = useState([]);
  const [searchSteps, setSearchSteps] = useState([]);
  
  useEffect(() => {
  
    // Don't search until we have both a location and a category
    if (!location || !selectedCategory) return;
  
    async function fetchNearbyPlaces() {
      setSearchSteps([
        "1. You selected a category.",
        "2. React checked that location and category both exist."
      ]);
  
      // Show loading message while the search is running
      setLoading(true);
  
      // Clear any previous error messages
      setError("");
  
      // Clear old search results before starting a new search
      setBusinesses([]);

      setSearchSteps(prev => [
        ...prev,
        "3. React cleared the old results and started loading."
      ]);
  
  
      // Maps our category buttons to OpenStreetMap search tags
      const categoryTags = {
        Restaurants: { key: "amenity", value: "restaurant" },
        Cafes: { key: "amenity", value: "cafe" },
        Parks: { key: "leisure", value: "park" },
        Shops: { key: "shop", value: "*" }
      };
  
      // Get the search tag that matches the selected category
      const tag = categoryTags[selectedCategory];

      setSearchSteps(prev => [
        ...prev,
        `4. React converted "${selectedCategory}" into an OpenStreetMap search tag.`
      ]);
  
      // Build the query used by the Overpass API
      // the 3000 value is the search radius in meters

      const query = `
        [out:json];
        (
          node["${tag.key}"="${tag.value}"](around:3000,${location.latitude},${location.longitude});
        );
        out;
      `;

      setSearchSteps(prev => [
        ...prev,
        "5. React built an API query using your latitude, longitude, and a 3000 meter radius."
      ]);
  
      // Create the API request URL
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  
      try {

        setSearchSteps(prev => [
          ...prev,
          "6. React sent the request to the Overpass API."
        ]);
  
        // Send request to the API
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error("Could not fetch nearby places.");
        }

        setSearchSteps(prev => [
          ...prev,
          "7. The API responded successfully."
        ]);
  
        // Convert the API response into JavaScript data
        const data = await response.json();

        setSearchSteps(prev => [
          ...prev,
          `8. React converted the response into JavaScript data.`,
          `9. React found ${data.elements?.length || 0} nearby place(s).`,
          "10. React saved the places in state so the page could display them."
        ]);
  
        console.log(data);
        console.log(data.elements);
  
        // Save the results 
        setBusinesses(data.elements || []);
  
      } catch (err) {

        setSearchSteps(prev => [
          ...prev,
          "Something went wrong while searching for nearby places."
        ]);

        //For the user to see error message
        setError("Something went wrong while finding nearby places.");
        console.error(err);
  
      } finally {

        setSearchSteps(prev => [
          ...prev,
          "11. React turned loading off."
        ]);

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
        setSteps={setSteps}
      />
      <section className="explain-section">
        <h2>What happened?</h2>

        {steps.map((step, index) => (
          <p key={index} className="explain-step">
            {step}
          </p>
        ))}
      </section>
      <section className="explain-section">
        <h2>How the Nearby Search Works</h2>

        {searchSteps.map((step, index) => (
          <p key={index} className="explain-step">
            {step}
          </p>
        ))}
      </section>

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
   
      </section>
    </main>
    
  )
}

