const API_URL = "http://localhost:8080/api";

export const createTime = async (time) => { 
  try { 
    const response = await fetch(`${API_URL}/times`, { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(time), 
    });

    if(!response.ok) { 
    const errorText = await response.text();
    console.log("Backend status:", response.status);
    console.log("Backend error:", errorText);
    throw new Error(errorText || "Failed to create game");
    }

    const createdTime = await response.json(); 

    return createdTime; 
  } catch(error) { 
    console.error("Error creating game:", error);
    throw error;
  }
};