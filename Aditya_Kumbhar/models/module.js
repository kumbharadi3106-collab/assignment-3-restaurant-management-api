const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    isAvailable: {
        type: Boolean,
        default: true
    }
});

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        cuisine: {
            type: String,
            required: true,
            trim: true
        },

        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5
        },

        menu: [menuItemSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);