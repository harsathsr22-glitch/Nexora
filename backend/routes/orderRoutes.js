const express = require("express");
const router = express.Router();

const Order = require("../models/order");

// Save a new order
router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body);

        const savedOrder = await order.save();

        res.status(201).json({
            message: "Order saved successfully!",
            order: savedOrder
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update order status
router.patch("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order status updated!",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;