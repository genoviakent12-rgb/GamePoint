const API_URL = "http://localhost:8080/api";

export const getNearbyVenues = async (latitude, longitude) => {
  const response = await fetch(
    `${API_URL}/venues/nearby?latitude=${latitude}&longitude=${longitude}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch nearby venues");
  }

  return await response.json();
};

export const getVenuePhoto = (photoName) => {
  return `${API_URL}/venues/photo?photoName=${encodeURIComponent(photoName)}`;
};
// "../../services/venue/VenueService";