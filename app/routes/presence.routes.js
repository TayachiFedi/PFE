module.exports = app => {
    const presences = require("../controllers/presence.controller.js")

    var router = require("express").Router();

    // Create a new presence
    router.post("/", presences.create);

    // Retrieve all Employees
    router.get("/", presences.findAll);

    // Retrieve all published Employees
    router.get("/published", presences.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", presences.findOne);

    // Update a Employee with id
    router.put("/:id", presences.update);

    // Delete a Employee with id
    router.delete("/:id", presences.delete);

    // Create a new Employee
    router.delete("/", presences.deleteAll);

    app.use('/api/presences', router);
};