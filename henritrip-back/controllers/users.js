// Users Controller
const email_valid = require("email-validator");
const pw_valid = require("password-validator");

const model = require("../models/user");

var pw_schema = new pw_valid();
pw_schema.is().min(3).has().not().spaces();

function getRole(role, preuve) {
  //Si l'une des valeur n'est pas donnée => Role par défaut : User
  if (
    role === null ||
    role === undefined ||
    preuve === null ||
    preuve === undefined
  ) {
    return "USER";
  }
  const r = role.trim().toLowerCase();
  // On peut avoir une liste de clés de validation pour prouver que l'utilisateur a bien une
  // Authorisation d'admin
  if (r === "admin" && preuve === process.env.ADMIN_KEY) {
    return "ADMIN";
  } else return "USER";
}

exports.register = (req, res, next) => {
  //Pas de Hashage pour l'instant, vérification du fonctionnement.
  const mail = req.body.email;
  const pw = req.body.password;
  const reqRole = req.body.role;
  const reqPreuve = req.body.preuve;
  const role = getRole(reqRole, reqPreuve);
  console.log(req.body);
  let userAdminKey = "NO_KEY";
  if (role === "ADMIN") {
    userAdminKey = reqPreuve;
  }
  if (email_valid.validate(mail) && pw_schema.validate(pw)) {
    const user = new model({
      email: mail,
      password: pw,
      role: role,
      adminKey: userAdminKey,
    });
    user
      .save()
      .then(() => {
        console.log("Utilisateur créé");
        res.status(201).json({ message: "Utilisateur créé", userID: user._id });
      })
      .catch((error) => {
        const duplMess =
          "MongoServerError: E11000 duplicate key error collection: henritrip.users";
        const isDuplicate = error.toString().startsWith(duplMess);
        const displayDupl = "Cet email est déjà attribué !";
        console.log(
          `Erreur Création de compte : ${isDuplicate ? displayDupl : error}`
        );
        res.status(400).json({ error, message: "Email déjà attribué" });
      });
  } else {
    console.log("Email ou mot de passe invalide");
    res.status(400).json({ message: "Email ou mot de passe invalide" });
  }
};

exports.login = (req, res, next) => {
  const mail = req.body.email;
  const pw = req.body.password;
  model
    .findOne({ email: mail })
    .then((user) => {
      if (!user) {
        console.log("LogIn : Erreur => Paire login/mot de passe incorrecte");
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      //comparer les mots de passe (Bcrypt maybe)
      if (pw === user.password) {
        console.log("Connecté.e en tant que : " + user.email);
        //Mettre  un token de validation
        res
          .status(200)
          .json({ message: "Utilisateur connecté", userID: user._id });
      } else {
        console.log("Paire login/mot de passe incorrecte.");
        res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte." });
      }
    })
    .catch((error) => {
      console.log("Paire login/mot de passe incorrecte.");
      res.status(401).json({ message: "Paire login/mot de passe incorrecte." });
    });
};
