import "./LocationButton.css"

/**
 * LocationButton Component
 * 
 * Responsibility:
 * Requests the user's location using the browser's Geolocation API.
 * 
 * Props
 * - setLocation: Updates the location state/
 * - setError: Updates the error state.
 * @returns 
 */
export default function LocationButton({setLocation, setError}) {

  /**
   * Handles the user's click on the location button
   * Geolocation logic will be added in a future step.
   */
  function handleLocationRequest() {

    // Verify the browser supports geolocation
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }
    // call to get current position (asks the browser to provide current location)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // log entire object
        console.log(position);

        // log coordinates data
        console.log(position.coords);

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.log(error);
        // Store the geolocation error message in state
        setError(error.message);
      }
    );
  }
  return (
    <button onClick={handleLocationRequest}>
      Use My Location
    </button>
  );
}