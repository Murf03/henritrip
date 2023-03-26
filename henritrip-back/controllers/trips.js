// Trips Controller
const tripSchema = require("../models/trip");

function myTrim(txt) {
  if (!txt.includes(" ")) return txt;
  const txtNoSpaceArr = txt.split(" ");
  let txtNoSpace = "";
  for (let i = 0; i < txtNoSpaceArr.length; i++) {
    if (txtNoSpaceArr[i] !== "") txtNoSpace += txtNoSpaceArr[i];
  }
  return txtNoSpace;
}

function filterList(list) {
  const correctList = [];
  let k = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== "" && list[i] !== " ") {
      correctList[k] = list[i];
      k++;
    }
  }
  return correctList;
}

function getListFromString(param) {
  if (param === "[]" || param === "" || param === " ") return [];
  const mobNoSpace = myTrim(param);
  let mobilities = filterList(mobNoSpace.split(","));
  console.log("No space : " + mobNoSpace);
  console.log(mobilities);
  return mobilities;
}

exports.createTrip = (req, res, next) => {
  const title = req.body.title;
  const desc = req.body.description;
  const days = req.body.days;
  const mobilities = getListFromString(req.body.mobilities);
  const seasons = getListFromString(req.body.seasons);
  const forWho = getListFromString(req.body.forWho);
  const activities = getListFromString(req.body.activities);
  const invitations = getListFromString(req.body.invitations);

  const trip = new tripSchema({
    title: title,
    description: desc,
    days: days,
    mobilities: mobilities,
    seasons: seasons,
    forWho: forWho,
    activities: activities,
    invitations: invitations,
  });
  trip
    .save()
    .then(() => {
      console.log("Trip créé !");
      res.status(201).json({ message: "Trip créé !", trip_ID: trip._id });
    })
    .catch((error) => {
      console.log(`Creation Trip : Erreur ${error}`);
      res.status(400).json({ error });
    });
};
