const BASE_URL =
  "https://crud-operations-8tkg.onrender.com/api/properties";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getProperties = async () => {
  const response = await fetch(BASE_URL, {
    headers: getAuthHeaders(),
  });

  return response.json();
};

export const createProperty = async (
  property
) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(property),
  });

  return response.json();
};

export const updateProperty = async (
  id,
  property
) => {
  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(property),
    }
  );

  return response.json();
};

export const deleteProperty = async (
  id
) => {
  const response = await fetch(
    `${BASE_URL}/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  return response.json();
};