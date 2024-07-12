const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user_routes");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");
const path = require("path");
const app = express();

//https
const https = require("https");
const fs = require("fs");

const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/process.env.DOMAIN/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/process.env.DOMAIN/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/process.env.DOMAIN/chain.pem",
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const httpServer = express();
const httpPort = 80;
httpServer.get("*", (req, res) => {
  res.redirect(`https://${req.hostname}${req.url}`);
});
//basic go to app.listen

app.use(
  cors({
    origin: "https://midorchard-client.vercel.app", // Adjust this to your frontend URL
    // origin: *
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://midorchard-client.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", ["GET", "POST", "PUT", "DELETE"]);
  res.header("Access-Control-Allow-Headers", ["Content-Type", "Authorization"]);
  next();
});

const port = process.env.PORT || 3000;
const cleanupUnverifiedUsers = require("./Utils/cleanupUnverifiedUsers");
const formRoutes = require("./routes/formSubmit");
dotenv.config();

app.use(express.json());

app.options("*", cors());

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to the database");
    cleanupUnverifiedUsers();
  })
  .catch((e) => {
    console.log("Error connecting to the database");
    console.log(e);
  });

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.use("/api", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/forms", formRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

//https changes here
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log("HTTP Server running on port 80");
});

httpsServer.listen(port, () => {
  console.log(`Https app listening on port ${port}!!`);
});
