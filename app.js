const express = require("express");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://in-quizzo.vercel.app",
      "https://in-quizzo-42ehoo7l7-cjinc121.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const homeRoute = require("./server/routes/homeRoute");
const userRoute = require("./server/routes/userRoute");
const quizRoute = require("./server/routes/quizRoute");

app.use("/api/v1", homeRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", quizRoute);

module.exports = app;
