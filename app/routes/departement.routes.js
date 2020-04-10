module.exports = app => {
    const departements = require("../controllers/departement.controller.js");

    var router = require("express").Router();

    // Create a new employee
    router.post("/", departements.create);

    // Retrieve all Employees
    router.get("/", departements.findAll);

    // Retrieve all published Employees
    router.get("/published", departements.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", departements.findOne);

    // Update a Employee with id
    router.put("/:id", departements.update);

    // Delete a Employee with id
    router.delete("/:id", departements.delete);

    // Create a new Employee
    router.delete("/", departements.deleteAll);

    app.use('/api/departements', router);
};