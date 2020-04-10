const db = require("../models");
const Conge = db.conges;
const mongoose = require('mongoose');
// Create and Save a new conge
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomconge) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a conge
    const conge = new Conge({
        _id: new mongoose.Types.ObjectId(),
        nomconge: req.body.nomconge,
        datedebutconge: req.body.datedebutconge,
        datefinconge: req.body.datefinconge,
        dureeconge: req.body.dureeconge,
        etat: req.body.etat,
        typeconge: req.body.typeconge,
        published: req.body.published ? req.body.published : false
    });




    // Save conge in the database
    conge
        .save(conge)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the conge."
            });
        });
};


// Retrieve all conge from the database.
exports.findAll = (req, res) => {
    const nomconge = req.query.nomconge;
    var condition = nomconge ? { nomconge: { $regex: new RegExp(nomconge), $options: "i" } } : {};

    Conge.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving conges."
            });
        });
};
// Find a single conge with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Conge.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found conge with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving congewith id=" + id });
        });
};

// Update a conge by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Conge.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update conge with id=${id}. Maybe conge was not found!`
                });
            } else res.send({ message: "conge was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating conge with id=" + id
            });
        });
};

// Delete a conge with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Conge.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete conge with id=${id}. Maybe conge was not found!`
                });
            } else {
                res.send({
                    message: "conge was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete conge with id=" + id
            });
        });
};

// Delete all conges from the database.
exports.deleteAll = (req, res) => {
    Conge.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} conges were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all conges."
            });
        });
};
// Find all published conges
exports.findAllPublished = (req, res) => {
    Conge.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving conges."
            });
        });
};