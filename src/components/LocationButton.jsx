import "./LocationButton.css"

/**
 * LocationButton Component
 * 
 * Responsibility:
 * Requests the user's location using the browser's Geolocation API.
 * 
 * Props
 * - setLocation: Updates the location state in App.jsx
 * - setError: Updates the error state in App.jsx
 * @returns 
 */
export default function LocationButton({setLocation, setError}) {
  return (
    <button>
      Use My Location
    </button>
  );
}