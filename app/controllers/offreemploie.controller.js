const db = require("../models");
const Offreemploie = db.offreemploies;

// Create and Save a new offreemploie
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomoffre) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a offreemploie
    const offreemploie = new Offreemploie({
        nomoffre: req.body.nomoffre,
        typeoffre: req.body.typeoffre,
        datecreation: req.body.datecreation,
        datecloture: req.body.datecloture,
        statutoffre: req.body.statutoffre,



        published: req.body.published ? req.body.published : false
    });





    // Save offreemploie in the database
    offreemploie
        .save(offreemploie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the offreemploie."
            });
        });
};


// Retrieve all offreemploie from the database.
exports.findAll = (req, res) => {
    const nomoffre = req.query.nomoffre;
    var condition = nomoffre ? { nomoffre: { $regex: new RegExp(nomoffre), $options: "i" } } : {};

    Offreemploie.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving offreemploies."
            });
        });
};
// Find a single offreemploie with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Offreemploie.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found offreemploie with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving offreemploiewith id=" + id });
        });
};

// Update a offreemploie by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Offreemploie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update offreemploie with id=${id}. Maybe offreemploie was not found!`
                });
            } else res.send({ message: "offreemploie was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating offreemploie with id=" + id
            });
        });
};

// Delete a offreemploie with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Offreemploie.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete offreemploie with id=${id}. Maybe offreemploie was not found!`
                });
            } else {
                res.send({
                    message: "offreemploie was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete offreemploie with id=" + id
            });
        });
};

// Delete all offreemploies from the database.
exports.deleteAll = (req, res) => {
    Offreemploie.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} offreemploies were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all offreemploies."
            });
        });
};
// Find all published offreemploies
exports.findAllPublished = (req, res) => {
    Offreemploie.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving offreemploies."
            });
        });
};