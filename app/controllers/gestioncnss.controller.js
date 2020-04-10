const db = require("../models");
const Gestioncnss = db.gestioncnsss;
const mongoose = require('mongoose');
// Create and Save a new gestioncnss
exports.create = (req, res) => {
    // Validate request
    if (!req.body.numcnss) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a gestioncnss
    const gestioncnss = new Gestioncnss({
        _id: new mongoose.Types.ObjectId(),
        numcnss: req.body.numcnss,


        published: req.body.published ? req.body.published : false
    });




    // Save gestioncnss in the database
    gestioncnss
        .save(gestioncnss)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the gestioncnss."
            });
        });
};


// Retrieve all gestioncnss from the database.
exports.findAll = (req, res) => {
    const typegestioncnss = req.query.typegestioncnss;
    var condition = typegestioncnss ? { typegestioncnss: { $regex: new RegExp(typegestioncnss), $options: "i" } } : {};

    Gestioncnss.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving gestioncnsss."
            });
        });
};
// Find a single gestioncnss with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Gestioncnss.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found gestioncnss with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving gestioncnsswith id=" + id });
        });
};

// Update a gestioncnss by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Gestioncnss.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update gestioncnss with id=${id}. Maybe gestioncnss was not found!`
                });
            } else res.send({ message: "gestioncnss was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating gestioncnss with id=" + id
            });
        });
};

// Delete a gestioncnss with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Gestioncnss.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete gestioncnss with id=${id}. Maybe gestioncnss was not found!`
                });
            } else {
                res.send({
                    message: "gestioncnss was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete gestioncnss with id=" + id
            });
        });
};

// Delete all gestioncnsss from the database.
exports.deleteAll = (req, res) => {
    Gestioncnss.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} gestioncnsss were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all gestioncnsss."
            });
        });
};
// Find all published gestioncnsss
exports.findAllPublished = (req, res) => {
    Gestioncnss.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving gestioncnsss."
            });
        });
};