// API Logic

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongo_sanitize = require("express-mongo-sanitize");
require("dotenv").config();

const usersRoute = require("./routes/users");
const activitiesRoute = require("./routes/activities");
const tripsRoute = require("./routes/trips");

const limiter = rateLimit({
  windowMs: Number(process.env.LIM_MINS) * 60 * 1000,
  max: Number(process.env.LIM_MAX),
  standardHeaders: true,
  legacyHeaders: false,
});

console.log("Initialisation");

mongoose
  .connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !" + err));

const app = express();

app.use(cors());
app.use(express.json()); //permet de gérer les données postées par un formulaire
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(limiter);

app.use(mongo_sanitize()); //permet d'éviter l'injection de code

app.use(
  helmet({ crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false })
);

//Ajouter les routes ici
app.use("/api/users", usersRoute);
app.use("/api/activities", activitiesRoute);
app.use("/api/trips", tripsRoute);

module.exports = app;
