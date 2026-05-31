import Header from "./components/Header.jsx"
import LocationButton from "./components/LocationButton.jsx"
import CategoryButtons from "./components/CategoryButtons.jsx"
import BusinessList from "./components/BusinessList.jsx"

export default function App() {
  return (
    <main>
      <Header />
      <LocationButton />
      <CategoryButtons />
      <BusinessList />
    </main>
    
  )
}

