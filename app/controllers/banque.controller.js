const db = require("../models");
const Banque = db.banques;
const mongoose = require('mongoose');
// Create and Save a new banque
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombanque) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a banque
    const banque = new Banque({
        _id: new mongoose.Types.ObjectId(),
        nombanque: req.body.nombanque,
        adressebanque: req.body.adressebanque,
        telbanque: req.body.telbanque,
        faxbanque: req.body.faxbanque,

        published: req.body.published ? req.body.published : false
    });




    // Save banque in the database
    banque
        .save(banque)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the banque."
            });
        });
};


// Retrieve all banque from the database.
exports.findAll = (req, res) => {
    const nombanque = req.query.nombanque;
    var condition = nombanque ? { nombanque: { $regex: new RegExp(nombanque), $options: "i" } } : {};

    Banque.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving banques."
            });
        });
};
// Find a single banque with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Banque.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found banque with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving banquewith id=" + id });
        });
};

// Update a banque by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Banque.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update banque with id=${id}. Maybe banque was not found!`
                });
            } else res.send({ message: "banque was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating banque with id=" + id
            });
        });
};

// Delete a banque with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Banque.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete banque with id=${id}. Maybe banque was not found!`
                });
            } else {
                res.send({
                    message: "banque was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete banque with id=" + id
            });
        });
};

// Delete all banques from the database.
exports.deleteAll = (req, res) => {
    Banque.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} banques were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all banques."
            });
        });
};
// Find all published banques
exports.findAllPublished = (req, res) => {
    Banque.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving banques."
            });
        });
};