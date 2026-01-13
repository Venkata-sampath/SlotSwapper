const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

const app = express();
connectDb();

// Middleware
app.use(express.json());

//deploy health check
app.get("/", (req, res)=>{
    res.json({
        status:"Backend Working",
        message: "Welcome to slot management api"
    });
});

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Slot Routes
app.use("/api/slots", require("./routes/slotRoutes"));

// Swap Request and response routes
app.use("/api/swaps", require("./routes/swapRequestRoutes"));

// Error Handler
app.use(errorHandler);

// Start the Server
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});