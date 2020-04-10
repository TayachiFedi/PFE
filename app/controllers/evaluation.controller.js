const db = require("../models");
const Evaluation = db.evaluations;
const mongoose = require('mongoose');
// Create and Save a new evaluation
exports.create = (req, res) => {
    // Validate request
    if (!req.body.typeevaluation) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a evaluation
    const evaluation = new Evaluation({
        _id: new mongoose.Types.ObjectId(),
        typeevaluation: req.body.typeevaluation,
        dateevaluation: req.body.dateevaluation,

        published: req.body.published ? req.body.published : false
    });




    // Save evaluation in the database
    evaluation
        .save(evaluation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the evaluation."
            });
        });
};


// Retrieve all evaluation from the database.
exports.findAll = (req, res) => {
    const typeevaluation = req.query.typeevaluation;
    var condition = typeevaluation ? { typeevaluation: { $regex: new RegExp(typeevaluation), $options: "i" } } : {};

    Evaluation.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving evaluations."
            });
        });
};
// Find a single evaluation with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Evaluation.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found evaluation with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving evaluationwith id=" + id });
        });
};

// Update a evaluation by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Evaluation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update evaluation with id=${id}. Maybe evaluation was not found!`
                });
            } else res.send({ message: "evaluation was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating evaluation with id=" + id
            });
        });
};

// Delete a evaluation with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Evaluation.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete evaluation with id=${id}. Maybe evaluation was not found!`
                });
            } else {
                res.send({
                    message: "evaluation was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete evaluation with id=" + id
            });
        });
};

// Delete all evaluations from the database.
exports.deleteAll = (req, res) => {
    Evaluation.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} evaluations were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all evaluations."
            });
        });
};
// Find all published evaluations
exports.findAllPublished = (req, res) => {
    Evaluation.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving evaluations."
            });
        });
};