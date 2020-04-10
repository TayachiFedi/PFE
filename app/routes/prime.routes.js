module.exports = app => {
    const primes = require("../controllers/prime.controller.js")

    var router = require("express").Router();

    // Create a new prime
    router.post("/", primes.create);

    // Retrieve all Employees
    router.get("/", primes.findAll);

    // Retrieve all published Employees
    router.get("/published", primes.findAllPublished);

    // Retrieve a single Employee with id
    router.get("/:id", primes.findOne);

    // Update a Employee with id
    router.put("/:id", primes.update);

    // Delete a Employee with id
    router.delete("/:id", primes.delete);

    // Create a new Employee
    router.delete("/", primes.deleteAll);


    app.use('/api/primes', router);
};