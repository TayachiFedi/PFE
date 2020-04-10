module.exports = app => {
    const gestionpointages = require("../controllers/gestionpointage.controller.js")

    var router = require("express").Router();

    // Create a new gestionpointage
    router.post("/", gestionpointages.create);

    // Retrieve all Employees
    router.get("/", gestionpointages.findAll);

    // Retrieve all published Employees
    router.get("/published", gestionpointages.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", gestionpointages.findOne);

    // Update a Employee with id
    router.put("/:id", gestionpointages.update);

    // Delete a Employee with id
    router.delete("/:id", gestionpointages.delete);

    // Create a new Employee
    router.delete("/", gestionpointages.deleteAll);

    app.use('/api/gestionpointages', router);
};