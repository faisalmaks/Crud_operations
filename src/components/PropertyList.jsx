"use client";

import { useEffect, useState } from "react";
import { getProperties } from "@/services/propertyService";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const response = await getProperties();

      console.log("API Response:", response);

      // Your API returns:
      // {
      //   count: 3,
      //   data: [...]
      // }

      setProperties(response.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Properties...</h2>;
  }

  return (
    <div>
      <h2>Properties List</h2>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        properties.map((property) => (
          <div
            key={property.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{property.title}</h3>

            <p>
              <strong>City:</strong> {property.city}
            </p>

            <p>
              <strong>Price:</strong> ₹{property.price}
            </p>

            <p>
              <strong>Bedrooms:</strong>{" "}
              {property.bedrooms}
            </p>

            <p>
              <strong>Bathrooms:</strong>{" "}
              {property.bathrooms}
            </p>

            <img
              src={property.imageUrl}
              alt={property.title}
              width="250"
            />
          </div>
        ))
      )}
    </div>
  );
}