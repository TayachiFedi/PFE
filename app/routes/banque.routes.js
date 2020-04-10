module.exports = app => {
    const banques = require("../controllers/banque.controller.js");

    var router = require("express").Router();

    // Create a new banque
    router.post("/", banques.create);

    // Retrieve all banques
    router.get("/", banques.findAll);

    // Retrieve all published banques
    router.get("/published", banques.findAllPublished);

    // Retrieve a single banque with id
    router.get("/:id", banques.findOne);

    // Update a banque with id
    router.put("/:id", banques.update);

    // Delete a banque with id
    router.delete("/:id", banques.delete);

    // Create a new banque
    router.delete("/", banques.deleteAll);

    app.use('/api/banques', router);
};