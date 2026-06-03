"use client";

import { useState } from "react";
import { createProperty } from "@/services/propertyService";

export default function CreateProperty() {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createProperty(formData);

console.log("Create API Response:", result);

alert(JSON.stringify(result, null, 2));

      setFormData({
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
      });
    } catch (error) {
      alert("Failed to create property");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Property</h2>

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />

      <input
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
      />

      <input
        name="status"
        placeholder="Status"
        value={formData.status}
        onChange={handleChange}
      />

      <input
        name="bedrooms"
        placeholder="Bedrooms"
        value={formData.bedrooms}
        onChange={handleChange}
      />

      <input
        name="bathrooms"
        placeholder="Bathrooms"
        value={formData.bathrooms}
        onChange={handleChange}
      />

      <input
        name="areaSqFt"
        placeholder="Area"
        value={formData.areaSqFt}
        onChange={handleChange}
      />

      <input
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <button type="submit">
        Create Property
      </button>
    </form>
  );
}