const db = require("../models");
const Personne = db.personnes;
const mongoose = require('mongoose');
// Create and Save a new personne
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a personne
    const personne = new Personne({
        _id: new mongoose.Types.ObjectId(),
        nom: req.body.nom,
        prenom: req.body.prenom,
        datedenaissance: req.body.datedenaissance,
        sexe: req.body.sexe,
        adresse: req.body.adresse,
        cin: req.body.cin,
        tel: req.body.tel,
        statusmatrimoniel: req.body.statusmatrimoniel,
        lieudenaissance: req.body.lieudenaissance,
        paysdenaissance: req.body.paysdenaissance,

        published: req.body.published ? req.body.published : false
    });




    // Save personne in the database
    personne
        .save(personne)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the personne."
            });
        });
};


// Retrieve all personne from the database.
exports.findAll = (req, res) => {
    const nom = req.query.nom;
    var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};

    Personne.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving personnes."
            });
        });
};
// Find a single personne with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Personne.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found personne with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving personnewith id=" + id });
        });
};

// Update a personne by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Personne.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update personne with id=${id}. Maybe personne was not found!`
                });
            } else res.send({ message: "personne was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating personne with id=" + id
            });
        });
};

// Delete a personne with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Personne.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete personne with id=${id}. Maybe personne was not found!`
                });
            } else {
                res.send({
                    message: "personne was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete personne with id=" + id
            });
        });
};

// Delete all personnes from the database.
exports.deleteAll = (req, res) => {
    Personne.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} personnes were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all personnes."
            });
        });
};
// Find all published personnes
exports.findAllPublished = (req, res) => {
    Personne.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving personnes."
            });
        });
};