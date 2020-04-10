const db = require("../models");
const Presence = db.presences;
const mongoose = require('mongoose');
// Create and Save a new presence
exports.create = (req, res) => {
    // Validate request
    if (!req.body.statut) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a presence
    const presence = new Presence({
        _id: new mongoose.Types.ObjectId(),
        statut: req.body.statut,
        date: req.body.date,
        nombreheures: req.body.nombreheures,
        //agg

        gestionpointage: req.body.gestionpointageId,
        conge: req.body.congeId,

        published: req.body.published ? req.body.published : false
    });





    // Save presence in the database
    presence
        .save(presence)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the presence."
            });
        });
};


// Retrieve all presence from the database.
exports.findAll = (req, res) => {
    const nompresence = req.query.nompresence;
    var condition = nompresence ? { nompresence: { $regex: new RegExp(nompresence), $options: "i" } } : {};

    Presence.find(condition)
        .populate('gestionpointage + conge')
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                contrat: docs.map(doc => {
                    return {
                        _id: doc._id,
                        //dateembauche: req.body.dateembauche,
                        //salairedebase: req.body.salairedebase,
                        statut: doc.statut,
                        date: doc.date,
                        nombreheures: doc.nombreheures,
                        gestionpointage: doc.gestionpointage,
                        conge: doc.conge,

                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/contrats/' + doc._id
                        }

                    }
                })
            })
        })
};
// Find a single presence with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Presence.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found presence with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving presencewith id=" + id });
        });
};

// Update a presence by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Presence.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update presence with id=${id}. Maybe presence was not found!`
                });
            } else res.send({ message: "presence was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating presence with id=" + id
            });
        });
};

// Delete a presence with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Presence.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete presence with id=${id}. Maybe presence was not found!`
                });
            } else {
                res.send({
                    message: "presence was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete presence with id=" + id
            });
        });
};

// Delete all presences from the database.
exports.deleteAll = (req, res) => {
    Presence.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} presences were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all presences."
            });
        });
};
// Find all published presences
exports.findAllPublished = (req, res) => {
    Presence.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving presences."
            });
        });
};