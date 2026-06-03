"use client";

import { useState } from "react";
import { deleteProperty } from "@/services/propertyService";

export default function DeleteProperty() {
  const [propertyId, setPropertyId] =
    useState("");

  const handleDelete = async () => {
    if (!propertyId) {
      alert("Enter Property ID");
      return;
    }

    const confirmDelete =
      confirm(
        "Are you sure you want to delete?"
      );

    if (!confirmDelete) return;

    try {
      await deleteProperty(
        propertyId
      );

      alert(
        "Property Deleted Successfully"
      );

      setPropertyId("");
    } catch (error) {
      alert(
        "Failed To Delete Property"
      );
    }
  };

  return (
    <div>
      <h2>Delete Property</h2>

      <input
        placeholder="Enter Property ID"
        value={propertyId}
        onChange={(e) =>
          setPropertyId(
            e.target.value
          )
        }
      />

      <button onClick={handleDelete}>
        Delete Property
      </button>
    </div>
  );
}