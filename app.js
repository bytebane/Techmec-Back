const express = require("express");
const app = express();
const cors = require("cors");

const categoryRoute = require("./routes/cateRoute");
const productRoute = require("./routes/prodRoute");
const cartRoute = require("./routes/cartRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");
const dealsRoute =require("./routes/excdealRoute");
const newarvRoute =require("./routes/newarvRoute");

// Use body parser middleware to parse body of incoming requests
// app.use('./public/uploads',express.static('./public/uploads'));
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes which should handle requests
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/excdeals", dealsRoute);
app.use("/newarrivals", newarvRoute);
// Handle Error Requests

app.get("/", (req, res) => {
  res.send('API IS NOW UP & RUNNING');
});

// Handle Error Requests
app.use((req, res, next) => {
  const error = new Error();
  error.message = "Not Found";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error });
});

module.exports = app;
