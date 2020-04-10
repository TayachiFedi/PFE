module.exports = app => {
    const offreemploies = require("../controllers/offreemploie.controller.js")

    var router = require("express").Router();

    // Create a new offreemploie
    router.post("/", offreemploies.create);

    // Retrieve all Employees
    router.get("/", offreemploies.findAll);

    // Retrieve all published Employees
    router.get("/published", offreemploies.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", offreemploies.findOne);

    // Update a Employee with id
    router.put("/:id", offreemploies.update);

    // Delete a Employee with id
    router.delete("/:id", offreemploies.delete);

    // Create a new Employee
    router.delete("/", offreemploies.deleteAll);

    app.use('/api/offreemploies', router);
};