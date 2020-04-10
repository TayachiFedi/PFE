module.exports = app => {
    const gestioncnsss = require("../controllers/gestioncnss.controller.js")

    var router = require("express").Router();

    // Create a new gestioncnss
    router.post("/", gestioncnsss.create);

    // Retrieve all Employees
    router.get("/", gestioncnsss.findAll);

    // Retrieve all published Employees
    router.get("/published", gestioncnsss.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", gestioncnsss.findOne);

    // Update a Employee with id
    router.put("/:id", gestioncnsss.update);

    // Delete a Employee with id
    router.delete("/:id", gestioncnsss.delete);

    // Create a new Employee
    router.delete("/", gestioncnsss.deleteAll);

    app.use('/api/gestioncnsss', router);
};