module.exports = app => {
    const conges = require("../controllers/conge.controller.js");

    var router = require("express").Router();

    // Create a new avance
    router.post("/", conges.create);

    // Retrieve all conges
    router.get("/", conges.findAll);

    // Retrieve all published conges
    router.get("/published", conges.findAllPublished);

    // Retrieve a single avance with id
    router.get("/:id", conges.findOne);

    // Update a avance with id
    router.put("/:id", conges.update);

    // Delete a avance with id
    router.delete("/:id", conges.delete);

    // Create a new avance
    router.delete("/", conges.deleteAll);

    app.use('/api/conges', router);
};