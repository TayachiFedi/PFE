const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome." });
});


require("./app/routes/employee.routes")(app) || require("./app/routes/banque.routes")(app) || require("./app/routes/departement.routes")(app)
    || require("./app/routes/avance.routes")(app) || require("./app/routes/conge.routes")(app) || require("./app/routes/evaluation.routes")(app)
    || require("./app/routes/presence.routes")(app) || require("./app/routes/offreemploie.routes")(app) || require("./app/routes/candidat.routes")(app)
    || require("./app/routes/gestionpointage.route")(app) || require("./app/routes/contrat.routes")(app) || require("./app/routes/typecontrat.routes")(app)
    || require("./app/routes/gestioncnss.routes")(app) || require("./app/routes/prime.routes")(app) || require("./app/routes/typeprime.routes")(app)
    || require("./app/routes//role.routes")(app) || require("./app/routes/personne.routes")(app) || require(".//app/routes/employeeposition.routes")(app)

    ;


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
