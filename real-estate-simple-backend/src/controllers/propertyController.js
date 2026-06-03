const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { readJsonFile, writeJsonFile } = require("../utils/fileDb");

const propertiesFilePath = path.join(__dirname, "../data/properties.json");

// GET /api/properties
function getAllProperties(req, res) {
  const properties = readJsonFile(propertiesFilePath, []);

  const {
    city,
    type,
    status,
    minPrice,
    maxPrice,
    bedrooms,
    search,
  } = req.query;

  let filteredProperties = [...properties];

  if (city) {
    filteredProperties = filteredProperties.filter((property) =>
      property.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  if (type) {
    filteredProperties = filteredProperties.filter((property) =>
      property.type.toLowerCase() === type.toLowerCase()
    );
  }

  if (status) {
    filteredProperties = filteredProperties.filter((property) =>
      property.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (minPrice) {
    filteredProperties = filteredProperties.filter(
      (property) => Number(property.price) >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filteredProperties = filteredProperties.filter(
      (property) => Number(property.price) <= Number(maxPrice)
    );
  }

  if (bedrooms) {
    filteredProperties = filteredProperties.filter(
      (property) => Number(property.bedrooms) === Number(bedrooms)
    );
  }

  if (search) {
    const searchText = search.toLowerCase();

    filteredProperties = filteredProperties.filter((property) => {
      return (
        property.title.toLowerCase().includes(searchText) ||
        property.description.toLowerCase().includes(searchText) ||
        property.city.toLowerCase().includes(searchText) ||
        property.address.toLowerCase().includes(searchText)
      );
    });
  }

  return res.json({
    count: filteredProperties.length,
    data: filteredProperties,
  });
}

// GET /api/properties/:id
function getPropertyById(req, res) {
  const { id } = req.params;

  const properties = readJsonFile(propertiesFilePath, []);

  const property = properties.find((item) => item.id === id);

  if (!property) {
    return res.status(404).json({
      message: "Property not found.",
    });
  }

  return res.json({
    data: property,
  });
}

// POST /api/properties
function createProperty(req, res) {
  const {
    title,
    description,
    price,
    city,
    address,
    type,
    status,
    bedrooms,
    bathrooms,
    areaSqFt,
    imageUrl,
  } = req.body;

  if (
    !title ||
    !description ||
    !price ||
    !city ||
    !address ||
    !type ||
    !status
  ) {
    return res.status(400).json({
      message:
        "title, description, price, city, address, type and status are required.",
    });
  }

  const properties = readJsonFile(propertiesFilePath, []);

  const newProperty = {
    id: uuidv4(),
    title,
    description,
    price: Number(price),
    city,
    address,
    type,
    status,
    bedrooms: Number(bedrooms) || 0,
    bathrooms: Number(bathrooms) || 0,
    areaSqFt: Number(areaSqFt) || 0,
    imageUrl: imageUrl || "",
    ownerId: req.user.id,
    ownerName: req.user.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  properties.push(newProperty);
  writeJsonFile(propertiesFilePath, properties);

  return res.status(201).json({
    message: "Property created successfully",
    data: newProperty,
  });
}

// PUT /api/properties/:id
function updateProperty(req, res) {
  const { id } = req.params;

  const properties = readJsonFile(propertiesFilePath, []);

  const propertyIndex = properties.findIndex((item) => item.id === id);

  if (propertyIndex === -1) {
    return res.status(404).json({
      message: "Property not found.",
    });
  }

  const property = properties[propertyIndex];

  if (property.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "You can update only your own property.",
    });
  }

  const updatedProperty = {
    ...property,
    ...req.body,
    price:
      req.body.price !== undefined ? Number(req.body.price) : property.price,
    bedrooms:
      req.body.bedrooms !== undefined
        ? Number(req.body.bedrooms)
        : property.bedrooms,
    bathrooms:
      req.body.bathrooms !== undefined
        ? Number(req.body.bathrooms)
        : property.bathrooms,
    areaSqFt:
      req.body.areaSqFt !== undefined
        ? Number(req.body.areaSqFt)
        : property.areaSqFt,
    id: property.id,
    ownerId: property.ownerId,
    ownerName: property.ownerName,
    createdAt: property.createdAt,
    updatedAt: new Date().toISOString(),
  };

  properties[propertyIndex] = updatedProperty;
  writeJsonFile(propertiesFilePath, properties);

  return res.json({
    message: "Property updated successfully",
    data: updatedProperty,
  });
}

// DELETE /api/properties/:id
function deleteProperty(req, res) {
  const { id } = req.params;

  const properties = readJsonFile(propertiesFilePath, []);

  const property = properties.find((item) => item.id === id);

  if (!property) {
    return res.status(404).json({
      message: "Property not found.",
    });
  }

  if (property.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "You can delete only your own property.",
    });
  }

  const updatedProperties = properties.filter((item) => item.id !== id);

  writeJsonFile(propertiesFilePath, updatedProperties);

  return res.json({
    message: "Property deleted successfully",
  });
}

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
