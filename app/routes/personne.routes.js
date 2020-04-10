module.exports = app => {
    const personnes = require("../controllers/personne.controller.js");

    var router = require("express").Router();

    // Create a new personne
    router.post("/", personnes.create);

    // Retrieve all Personnes
    router.get("/", personnes.findAll);

    // Retrieve all published Personnes
    router.get("/published", personnes.findAllPublished);

    // Retrieve a single Personne with id
    router.get("/:id", personnes.findOne);

    // Update a Personne with id
    router.put("/:id", personnes.update);

    // Delete a Personne with id
    router.delete("/:id", personnes.delete);

    // Create a new Personne
    router.delete("/", personnes.deleteAll);

    app.use('/api/personnes', router);
};