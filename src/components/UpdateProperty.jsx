"use client";

import { useState } from "react";
import { updateProperty } from "@/services/propertyService";

export default function UpdateProperty() {
  const [propertyId, setPropertyId] =
    useState("sample-property-1");

  const [formData, setFormData] = useState({
    id: "sample-property-1",
    title: "",
    description: "",
    price: "",
    city: "",
    address: "",
    type: "",
    status: "",
    bedrooms: "",
    bathrooms: "",
    areaSqFt: "",
    imageUrl: "",
    ownerId: "system",
    ownerName: "Demo Admin",
    createdAt: "2026-01-01T10:00:00.000Z",
    updatedAt: "2026-01-01T10:00:00.000Z",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProperty(
        propertyId,
        formData
      );

      alert("Property Updated");
    } catch (error) {
      alert("Update Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Property</h2>

      <input
        placeholder="Property ID"
        value={propertyId}
        onChange={(e) =>
          setPropertyId(
            e.target.value
          )
        }
      />

      <input
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <input
        name="type"
        placeholder="Type"
        onChange={handleChange}
      />

      <input
        name="status"
        placeholder="Status"
        onChange={handleChange}
      />

      <button type="submit">
        Update Property
      </button>
    </form>
  );
}