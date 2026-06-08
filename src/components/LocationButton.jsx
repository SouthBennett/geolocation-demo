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
export default function LocationButton({setLocation, setError, setSteps}) {

  /**
   * Handles the user's click on the location button
   * Geolocation logic will be added in a future step.
   */
  function handleLocationRequest() {

    setSteps([
      "1. You clicked the Use My Location button."
    ]);

    // Verify the browser supports geolocation
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setSteps(prev => [
      ...prev,
      "2. React checked if the browser supports geolocation.",
      "3. The browser asked for permission to use your location."
    ]);


    // call to get current position (asks the browser to provide current location)
    navigator.geolocation.getCurrentPosition(
      (position) => {

        setSteps(prev => [
          ...prev,
          "4. Permission was granted.",
          "5. The browser returned latitude and longitude.",
          "6. React saved the coordinates in state."
        ]);

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

        setSteps(prev => [
          ...prev,
          "4. Location permission failed or was denied."
        ]);
        // Store the geolocation error message in state
        setError(error.message);
      }
    );
  }
  return (
    <button
    className="location-button"
    onClick={handleLocationRequest}>
      Use My Location
    </button>
  );
}