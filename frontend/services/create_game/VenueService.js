const API_URL = "http://localhost:8080/api";

export const createVenue = async (venue) => {
  try {
    const response = await fetch(`${API_URL}/venues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: venue.name,
        address: venue.address,
        latitude: venue.latitude,
        longitude: venue.longitude,
        rating: venue.rating,
        phone: venue.phone,
        imageUrl: venue.image,
        available: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Venue backend status:", response.status);
      console.log("Venue backend error:", errorText);

      throw new Error(errorText || "Failed to create venue");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};