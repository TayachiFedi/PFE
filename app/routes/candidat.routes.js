module.exports = app => {
    const candidats = require("../controllers/candidat.controller.js");

    var router = require("express").Router();

    // Create a new candidat
    router.post("/", candidats.create);

    // Retrieve all candidats
    router.get("/", candidats.findAll);

    // Retrieve all published candidats
    router.get("/published", candidats.findAllPublished);

    // Retrieve a single candidat with id
    router.get("/:id", candidats.findOne);

    // Update a candidat with id
    router.put("/:id", candidats.update);

    // Delete a candidat with id
    router.delete("/:id", candidats.delete);

    // Create a new candidat
    router.delete("/", candidats.deleteAll);

    app.use('/api/candidats', router);
};