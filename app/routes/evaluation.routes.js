module.exports = app => {
    const evaluations = require("../controllers/evaluation.controller.js")

    var router = require("express").Router();

    // Create a new evaluation
    router.post("/", evaluations.create);

    // Retrieve all Employees
    router.get("/", evaluations.findAll);

    // Retrieve all published Employees
    router.get("/published", evaluations.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", evaluations.findOne);

    // Update a Employee with id
    router.put("/:id", evaluations.update);

    // Delete a Employee with id
    router.delete("/:id", evaluations.delete);

    // Create a new Employee
    router.delete("/", evaluations.deleteAll);

    app.use('/api/evaluations', router);
};