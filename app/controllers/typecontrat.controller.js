const db = require("../models");
const Typecontrat = db.typecontrats;
const mongoose = require('mongoose');
// Create and Save a new typecontrat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.typecontrat) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a typecontrat
    const typecontrat = new Typecontrat({

        _id: new mongoose.Types.ObjectId(),
        typecontrat: req.body.typecontrat,



        published: req.body.published ? req.body.published : false
    });





    // Save typecontrat in the database
    typecontrat
        .save(typecontrat)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the typecontrat."
            });
        });
};


// Retrieve all typecontrat from the database.
exports.findAll = (req, res) => {
    const nomtypecontrat = req.query.nomtypecontrat;
    var condition = nomtypecontrat ? { nomtypecontrat: { $regex: new RegExp(nomtypecontrat), $options: "i" } } : {};

    Typecontrat.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving typecontrats."
            });
        });
};
// Find a single typecontrat with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Typecontrat.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found typecontrat with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving typecontratwith id=" + id });
        });
};

// Update a typecontrat by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Typecontrat.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update typecontrat with id=${id}. Maybe typecontrat was not found!`
                });
            } else res.send({ message: "typecontrat was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating typecontrat with id=" + id
            });
        });
};

// Delete a typecontrat with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Typecontrat.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete typecontrat with id=${id}. Maybe typecontrat was not found!`
                });
            } else {
                res.send({
                    message: "typecontrat was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete typecontrat with id=" + id
            });
        });
};

// Delete all typecontrats from the database.
exports.deleteAll = (req, res) => {
    Typecontrat.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} typecontrats were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all typecontrats."
            });
        });
};
// Find all published typecontrats
exports.findAllPublished = (req, res) => {
    Typecontrat.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving typecontrats."
            });
        });
};