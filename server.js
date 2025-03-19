const express = require("express");
const cors = require("cors");
const { syncDB } = require("./models/index");

const app = express();
app.use(express.json());
app.use(cors());

syncDB(); // Sync database when server starts

// Import and use routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
