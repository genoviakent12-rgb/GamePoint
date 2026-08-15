const API_URL = "http://localhost:8080/api";

export const getGames = async () => {
  try {
    const response = await fetch(`${API_URL}/games`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const getGameById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/games/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
};

export const joinGame = async (id) => {
  try {
    const response = await fetch(`${API_URL}/games/${id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to join game: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error joining game:", error);
    throw error;
  }
};