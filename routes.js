const express = require("express");
const Hospital = require("../models/Hospital");

const router = express.Router();

// Create Hospital
router.post("/create", async (req, res) => {
    try {
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.status(201).json(hospital);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Hospitals by City
router.get("/", async (req, res) => {
    try {
        const { city } = req.query;
        const hospitals = await Hospital.find(city ? { city } : {});
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Hospital
router.delete("/delete", async (req, res) => {
    try {
        await Hospital.findByIdAndDelete(req.query.id);
        res.json({ message: "Hospital deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Hospital
router.put("/update", async (req, res) => {
    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(req.query.id, req.body, { new: true });
        res.json(updatedHospital);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add Hospital Details
router.post("/details", async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.query.id);
        if (!hospital) return res.status(404).json({ message: "Hospital not found" });

        Object.assign(hospital, req.body);
        await hospital.save();
        res.json(hospital);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
