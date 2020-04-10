module.exports = app => {
    const employeepositions = require("../controllers/employeeposition.controller.js")

    var router = require("express").Router();

    // Create a new employeeposition
    router.post("/", employeepositions.create);

    // Retrieve all Employees
    router.get("/", employeepositions.findAll);

    // Retrieve all published Employees
    router.get("/published", employeepositions.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", employeepositions.findOne);

    // Update a Employee with id
    router.put("/:id", employeepositions.update);

    // Delete a Employee with id
    router.delete("/:id", employeepositions.delete);

    // Create a new Employee
    router.delete("/", employeepositions.deleteAll);

    app.use('/api/employeepositions', router);
};