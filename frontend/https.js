export async function fetchAvaliablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch  the places data");
  }
  return data.places;
}
export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch the user places data");
  }
  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch the Updated places data");
  }
  return data.message;
}
