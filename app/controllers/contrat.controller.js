const db = require("../models");
const Contrat = db.contrats;
const mongoose = require('mongoose');
// Create and Save a new contrat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.dateembauche) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a contrat
    const contrat = new Contrat({
        _id: new mongoose.Types.ObjectId(),
        dateembauche: req.body.dateembauche,
        salairedebase: req.body.salairedebase,

        //aggreg

        typecontrat: req.body.typecontratId,
        gestioncnss: req.body.gestioncnssId,
        prime: req.body.primeId,
        employeeposition: req.body.employeepositionId,
        published: req.body.published ? req.body.published : false
    });


    // Save contrat in the database
    contrat
        .save(contrat)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the contrat."
            });
        });
};


// Retrieve all contrat from the database.
exports.findAll = (req, res) => {
    const nomcontrat = req.query.nomcontrat;
    var condition = nomcontrat ? { nomcontrat: { $regex: new RegExp(nomcontrat), $options: "i" } } : {};

    Contrat.find(condition)
        .populate('typecontrat + gestioncnss + prime + employeeposition')
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                contrat: docs.map(doc => {
                    return {
                        _id: doc._id,
                        //dateembauche: req.body.dateembauche,
                        //salairedebase: req.body.salairedebase,
                        dateembauche: doc.dateembauche,
                        salairedebase: doc.salairedebase,
                        typecontrat: doc.typecontrat,
                        gestioncnss: doc.gestioncnss,
                        prime: doc.prime,
                        employeeposition: doc.employeeposition,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/contrats/' + doc._id
                        }

                    }
                })
            })
        })
};
// Find a single contrat with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Contrat.findById(id)
        .populate('typecontrat + gestioncnss + prime ')
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found contrat with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500).json({
                    count: docs.length,
                    contrat: docs.map(doc => {
                        return {
                            _id: doc._id,
                            //dateembauche: req.body.dateembauche,
                            //salairedebase: req.body.salairedebase,
                            dateembauche: doc.dateembauche,
                            salairedebase: doc.salairedebase,
                            typecontrat: doc.typecontrat,
                            gestioncnss: doc.gestioncnss,
                            prime: doc.prime,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/api/contrats/' + doc._id
                            }

                        }
                    })
                })
        })
};

// Update a contrat by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Contrat.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update contrat with id=${id}. Maybe contrat was not found!`
                });
            } else res.send({ message: "contrat was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating contrat with id=" + id
            });
        });
};

// Delete a contrat with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Contrat.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete contrat with id=${id}. Maybe contrat was not found!`
                });
            } else {
                res.send({
                    message: "contrat was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete contrat with id=" + id
            });
        });
};

// Delete all contrats from the database.
exports.deleteAll = (req, res) => {
    Contrat.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} contrats were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all contrats."
            });
        });
};
// Find all published contrats
exports.findAllPublished = (req, res) => {
    Contrat.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving contrats."
            });
        });
};