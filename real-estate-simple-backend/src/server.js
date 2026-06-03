const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Real Estate Backend API is running",
    apiBaseUrl: `https://crud-operations-8tkg.onrender.com/api`,
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

// 404 route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
console.log("JWT_SECRET =", process.env.JWT_SECRET);
console.log("JWT_EXPIRES_IN =", process.env.JWT_EXPIRES_IN);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
