const API_URL = "http://localhost:8080/api";

export const createGame = async (game) => {
  try {
    const response = await fetch(`${API_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });

    if (!response.ok) {
  const errorText = await response.text();
  console.log("Backend status:", response.status);
  console.log("Backend error:", errorText);
  throw new Error(errorText || "Failed to create game");
}

    const createdGame = await response.json();

    return createdGame;
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
};

export const deleteGame = async (gameId, hostId) => {
  try {
    const response = await fetch(
      `${API_URL}/games/${gameId}?hostId=${hostId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to delete game");
    }

    return true;
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
};

export const getGameById = async (gameId) => {
  try {
    const response = await fetch(`${API_URL}/games/${gameId}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to get game");
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting game:", error);
    throw error;
  }
};