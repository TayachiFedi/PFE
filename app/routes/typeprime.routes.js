module.exports = app => {
    const typeprimes = require("../controllers/typeprime.controller.js")

    var router = require("express").Router();

    // Create a new typeprime
    router.post("/", typeprimes.create);

    // Retrieve all Employees
    router.get("/", typeprimes.findAll);

    // Retrieve all published Employees
    router.get("/published", typeprimes.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", typeprimes.findOne);

    // Update a Employee with id
    router.put("/:id", typeprimes.update);

    // Delete a Employee with id
    router.delete("/:id", typeprimes.delete);

    // Create a new Employee
    router.delete("/", typeprimes.deleteAll);

    app.use('/api/typeprimes', router);
};