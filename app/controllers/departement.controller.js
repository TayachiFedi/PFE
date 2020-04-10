const db = require("../models");
const Departement = db.departements;
const mongoose = require('mongoose')
// Create and Save a new departement
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomdepartement) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a departement
    const departement = new Departement({
        _id: new mongoose.Types.ObjectId(),
        nomdepartement: req.body.nomdepartement,


        published: req.body.published ? req.body.published : false
    });





    // Save departement in the database
    departement
        .save(departement)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the departement."
            });
        });
};


// Retrieve all departement from the database.
exports.findAll = (req, res) => {
    const nomdepartement = req.query.nomdepartement;
    var condition = nomdepartement ? { nomdepartement: { $regex: new RegExp(nomdepartement), $options: "i" } } : {};

    Departement.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving departements."
            });
        });
};
// Find a single departement with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Departement.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found departement with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving departementwith id=" + id });
        });
};

// Update a departement by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Departement.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update departement with id=${id}. Maybe departement was not found!`
                });
            } else res.send({ message: "departement was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating departement with id=" + id
            });
        });
};

// Delete a departement with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Departement.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete departement with id=${id}. Maybe departement was not found!`
                });
            } else {
                res.send({
                    message: "departement was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete departement with id=" + id
            });
        });
};

// Delete all departements from the database.
exports.deleteAll = (req, res) => {
    Departement.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} departements were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all departements."
            });
        });
};
// Find all published departements
exports.findAllPublished = (req, res) => {
    Departement.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving departements."
            });
        });
};