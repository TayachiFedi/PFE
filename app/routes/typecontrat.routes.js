module.exports = app => {
    const typecontrats = require("../controllers/typecontrat.controller.js")

    var router = require("express").Router();

    // Create a new typecontrat
    router.post("/", typecontrats.create);

    // Retrieve all Employees
    router.get("/", typecontrats.findAll);

    // Retrieve all published Employees
    router.get("/published", typecontrats.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", typecontrats.findOne);

    // Update a Employee with id
    router.put("/:id", typecontrats.update);

    // Delete a Employee with id
    router.delete("/:id", typecontrats.delete);

    // Create a new Employee
    router.delete("/", typecontrats.deleteAll);

    app.use('/api/typecontrats', router);
};