module.exports = app => {
    const contrats = require("../controllers/contrat.controller.js");

    var router = require("express").Router();

    // Create a new contrat
    router.post("/", contrats.create);

    // Retrieve all contrats
    router.get("/", contrats.findAll);

    // Retrieve all published contrats
    router.get("/published", contrats.findAllPublished);

    // Retrieve a single contrat with id
    router.get("/:id", contrats.findOne);

    // Update a contrat with id
    router.put("/:id", contrats.update);

    // Delete a contrat with id
    router.delete("/:id", contrats.delete);

    // Create a new contrat
    router.delete("/", contrats.deleteAll);

    app.use('/api/contrats', router);
};