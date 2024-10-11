import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error";
import { sortPlacesByDistance } from "./../loc";
import { fetchAvaliablePlaces } from "../../https.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setFetching(true);
      try {
        const places = await fetchAvaliablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvaliablePlaces(sortedPlaces);
          setFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Couldn't fetch the places data,Please Try Again",
        });
        setFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error Occured" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Fetching Places Data..."
      places={avaliablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
