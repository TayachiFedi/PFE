module.exports = app => {
    const avances = require("../controllers/avance.controller.js");

    var router = require("express").Router();

    // Create a new avance
    router.post("/", avances.create);

    // Retrieve all avances
    router.get("/", avances.findAll);

    // Retrieve all published avances
    router.get("/published", avances.findAllPublished);

    // Retrieve a single avance with id
    router.get("/:id", avances.findOne);

    // Update a avance with id
    router.put("/:id", avances.update);

    // Delete a avance with id
    router.delete("/:id", avances.delete);

    // Create a new avance
    router.delete("/", avances.deleteAll);

    app.use('/api/avances', router);
};