const express = require("express");
const path = require("path");
// One .env at the repo root, shared by backend and frontend (Railway injects real env vars instead)
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const { initDb } = require("./db"); // after dotenv so DATABASE_URL is set
const userRouter = require("./routes/user_routes");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");
const app = express();

app.use(cors({
  // Frontend is served by this same service, so same-origin needs no CORS.
  // Set FRONTEND_URL only if you also call the API from another domain.
  origin: process.env.FRONTEND_URL || true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const port = process.env.PORT || 3000;
const cleanupUnverifiedUsers = require("./Utils/cleanupUnverifiedUsers");
const formRoutes = require("./routes/formSubmit");
app.use(express.json());

initDb()
  .then(() => {
    console.log("Connected to the database");
    cleanupUnverifiedUsers();
  })
  .catch((e) => {
    console.log("Error connecting to the database");
    console.log(e);
  });

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/forms", formRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
});
