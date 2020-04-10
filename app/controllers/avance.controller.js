const db = require("../models");
const Avance = db.avances;

// Create and Save a new avance
exports.create = (req, res) => {
    // Validate request
    if (!req.body.valeur) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a avance
    const avance = new Avance({
        valeur: req.body.valeur,
        dateavance: req.body.dateavance,


        published: req.body.published ? req.body.published : false
    });




    // Save avance in the database
    avance
        .save(avance)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the avance."
            });
        });
};


// Retrieve all avance from the database.
exports.findAll = (req, res) => {
    const valeur = req.query.valeur;
    var condition = valeur ? { valeur: { $regex: new RegExp(valeur), $options: "i" } } : {};

    Avance.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving avances."
            });
        });
};
// Find a single avance with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Avance.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found avance with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving avancewith id=" + id });
        });
};

// Update a avance by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Avance.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update avance with id=${id}. Maybe avance was not found!`
                });
            } else res.send({ message: "avance was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating avance with id=" + id
            });
        });
};

// Delete a avance with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Avance.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete avance with id=${id}. Maybe avance was not found!`
                });
            } else {
                res.send({
                    message: "avance was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete avance with id=" + id
            });
        });
};

// Delete all avances from the database.
exports.deleteAll = (req, res) => {
    Avance.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} avances were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all avances."
            });
        });
};
// Find all published avances
exports.findAllPublished = (req, res) => {
    Avance.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving avances."
            });
        });
};