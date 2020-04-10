const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.employees = require("./employee.model.js")(mongoose);
//banque requirement
db.banques = require("./banque.model.js")(mongoose);
//departemeents requirement
db.departements = require("./departement.model.js")(mongoose);
//avances requirement
db.avances = require("./avance.model.js")(mongoose);
//conges requirement
db.conges = require("./conge.model.js")(mongoose);
//evaluation requirement
db.evaluations = require("./evaluation.model.js")(mongoose);
// presence requirement
db.presences = require("./presence.model.js")(mongoose);
// offre emploie requirement
db.offreemploies = require("./offreemploie.models.js")(mongoose);
// candidat requirement
db.candidats = require("./candidat.model.js")(mongoose);
//gestion pointage requirement
db.gestionpointages = require("./gestionpointage.model.js")(mongoose);
//contrat requirement
db.contrats = require("./contrat.model.js")(mongoose);
//type contrat requirement
db.typecontrats = require("./typecontrat.model.js")(mongoose);
//gestion cnss requirement
db.gestioncnsss = require("./gestioncnss.models.js")(mongoose);
//prime requirement
db.primes = require("./prime.model.js")(mongoose);
//type prime requirement
db.typeprimes = require("./typeprime.model")(mongoose);
// role requirement
db.roles = require("./role.model.js")(mongoose);
//personne requirement
db.personnes = require("./personne.model")(mongoose);
//employee position requirement
db.employeepositions = require("./employeeposition.model")(mongoose);
module.exports = db;