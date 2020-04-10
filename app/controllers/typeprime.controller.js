const db = require("../models");
const Typeprime = db.typeprimes;
const mongoose = require('mongoose');

// Create and Save a new typeprime
exports.create = (req, res) => {
    // Validate request
    if (!req.body.typeprime) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a typeprime
    const typeprime = new Typeprime({
        _id: new mongoose.Types.ObjectId(),
        typeprime: req.body.typeprime,

        published: req.body.published ? req.body.published : false
    });





    // Save typeprime in the database
    typeprime
        .save(typeprime)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the typeprime."
            });
        });
};


// Retrieve all typeprime from the database.
exports.findAll = (req, res) => {
    const nomtypeprime = req.query.nomtypeprime;
    var condition = nomtypeprime ? { nomtypeprime: { $regex: new RegExp(nomtypeprime), $options: "i" } } : {};

    Typeprime.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving typeprimes."
            });
        });
};
// Find a single typeprime with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Typeprime.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found typeprime with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving typeprimewith id=" + id });
        });
};

// Update a typeprime by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Typeprime.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update typeprime with id=${id}. Maybe typeprime was not found!`
                });
            } else res.send({ message: "typeprime was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating typeprime with id=" + id
            });
        });
};

// Delete a typeprime with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Typeprime.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete typeprime with id=${id}. Maybe typeprime was not found!`
                });
            } else {
                res.send({
                    message: "typeprime was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete typeprime with id=" + id
            });
        });
};

// Delete all typeprimes from the database.
exports.deleteAll = (req, res) => {
    Typeprime.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} typeprimes were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all typeprimes."
            });
        });
};
// Find all published typeprimes
exports.findAllPublished = (req, res) => {
    Typeprime.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving typeprimes."
            });
        });
};