require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug: Ensure .env is loaded
console.log("🔹 PORT from .env:", process.env.PORT);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "hospitalDB" })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Define the Hospital Schema
const hospitalSchema = new mongoose.Schema({
  name: String,
  city: String,
  image: String,
  rating: Number,
  description: String,
  images: [String],
  numberOfDoctors: Number,
  numberOfDepartments: Number,
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

// ✅ Create a Hospital (No Authentication Required)
app.post("/api/v1/hospitals/create", async (req, res) => {
  try {
    const hospital = new Hospital(req.body);
    await hospital.save();
    res.status(201).json({ success: true, hospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Get Hospitals by City
app.get("/api/v1/hospitals", async (req, res) => {
  try {
    const { city } = req.query;
    const hospitals = await Hospital.find(city ? { city } : {});
    res.json({ success: true, hospitals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Delete a Hospital (No Authentication Required)
app.delete("/api/v1/hospitals/delete", async (req, res) => {
  try {
    const { id } = req.query;
    await Hospital.findByIdAndDelete(id);
    res.json({ success: true, message: "Hospital deleted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Update a Hospital (No Authentication Required)
app.put("/api/v1/hospitals/update", async (req, res) => {
  try {
    const { id } = req.query;
    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, hospital: updatedHospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Add Hospital Details (No Authentication Required)
app.post("/api/v1/hospitals/details", async (req, res) => {
  try {
    const { id } = req.query;
    const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, hospital: updatedHospital });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
