const API_URL = "http://localhost:8080/api";

export const deleteGame = async (game, currentUserId) => { 
  if (game.host?.id !== currentUserId) { 
    throw new Error("You can only delete the game you created.")
  } 

  const response = await fetch(
    `${API_URL}/games/${game.id}?hostId=${currentUserId}`, 
    { 
      method: "DELETE", 
      headers: { 
        "Content-Type": "application/json",
      },
    }
  );

  

  if (!response.ok) {
      throw new Error(`Unable to delete game: ${response.status}`);
    }

    
    return response.json();
};

