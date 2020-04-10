const db = require("../models");
const Gestionpointage = db.gestionpointages;
const mongoose = require('mongoose');
// Create and Save a new gestionpointage
exports.create = (req, res) => {
    // Validate request
    if (!req.body.heurearrive) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a gestionpointage
    const gestionpointage = new Gestionpointage({
        _id: new mongoose.Types.ObjectId(),
        heurearrive: req.body.heurearrive,
        heuresortie: req.body.heuresortie,




        published: req.body.published ? req.body.published : false
    });





    // Save gestionpointage in the database
    gestionpointage
        .save(gestionpointage)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the gestionpointage."
            });
        });
};


// Retrieve all gestionpointage from the database.
exports.findAll = (req, res) => {
    const nomoffre = req.query.nomoffre;
    var condition = nomoffre ? { nomoffre: { $regex: new RegExp(nomoffre), $options: "i" } } : {};

    Gestionpointage.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving gestionpointages."
            });
        });
};
// Find a single gestionpointage with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Gestionpointage.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found gestionpointage with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving gestionpointagewith id=" + id });
        });
};

// Update a gestionpointage by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Gestionpointage.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update gestionpointage with id=${id}. Maybe gestionpointage was not found!`
                });
            } else res.send({ message: "gestionpointage was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating gestionpointage with id=" + id
            });
        });
};

// Delete a gestionpointage with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Gestionpointage.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete gestionpointage with id=${id}. Maybe gestionpointage was not found!`
                });
            } else {
                res.send({
                    message: "gestionpointage was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete gestionpointage with id=" + id
            });
        });
};

// Delete all gestionpointages from the database.
exports.deleteAll = (req, res) => {
    Gestionpointage.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} gestionpointages were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all gestionpointages."
            });
        });
};
// Find all published gestionpointages
exports.findAllPublished = (req, res) => {
    Gestionpointage.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving gestionpointages."
            });
        });
};