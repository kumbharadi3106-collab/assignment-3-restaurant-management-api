const express = require("express");
const Restaurant = require("../models/module");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get all restaurants
router.get("/", async (req, res) => {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
});

// Get top 5
router.get("/top", async (req, res) => {
    const restaurants = await Restaurant.find()
        .sort({ rating: -1 })
        .limit(5);

    res.json(restaurants);
});

// Get one restaurant
router.get("/:id", async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
});

// Create restaurant
router.post("/", auth, async (req, res) => {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json(restaurant);
});

// Update restaurant
router.put("/:id", auth, async (req, res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(restaurant);
});

// Delete restaurant
router.delete("/:id", auth, async (req, res) => {
    await Restaurant.findByIdAndDelete(req.params.id);

    res.json({ message: "Restaurant deleted" });
});

// Get menu
router.get("/:id/menu", async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant.menu);
});

// Add menu item
router.post("/:id/menu", auth, async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);

    restaurant.menu.push(req.body);
    await restaurant.save();

    res.status(201).json(restaurant.menu);
});

module.exports = router;