const BASE_URL = "http://localhost:5000/api/auth";

export const signupUser = async (userData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(
      `${BASE_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};