// Activities Controller
const activitySchema = require("../models/activity");

const activityCategories = {
  parc: "PARK",
  musee: "MUSEUM",
  chateau: "CASTLE",
  activite: "ACTIVITY",
  grotte: "CAVE",
};

function getCatFromText(txt) {
  return activityCategories[txt] ?? "ACTIVITY";
}

exports.createActivity = (req, res, next) => {
  const title = req.body.title;
  const desc = req.body.description;
  const category = req.body.category;
  const adress = req.body.adress;
  const phone = req.body.phone;
  const opensAt = req.body.opensAt;
  const website = req.body.website;

  const activity = new activitySchema({
    title: title,
    description: desc,
    category: getCatFromText(category),
    adress: adress,
    phone: phone,
    opensAt: opensAt,
    website: website,
  });
  activity
    .save()
    .then(() => {
      console.log("Activité créée !");
      res
        .status(201)
        .json({ message: "Activité créée !", activityID: activity._id });
    })
    .catch((error) => {
      console.log(`Creation Activité : Erreur ${error}`);
      res.status(400).json({ error });
    });
};
