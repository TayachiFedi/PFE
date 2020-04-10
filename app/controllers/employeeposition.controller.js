const db = require("../models");
const Employeeposition = db.employeepositions;
const mongoose = require('mongoose');
// Create and Save a new employeeposition
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomposition) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a employeeposition
    const employeeposition = new Employeeposition({
        _id: new mongoose.Types.ObjectId(),
        nomposition: req.body.nomposition,


        published: req.body.published ? req.body.published : false
    });




    // Save employeeposition in the database
    employeeposition
        .save(employeeposition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the employeeposition."
            });
        });
};


// Retrieve all employeeposition from the database.
exports.findAll = (req, res) => {
    const typeemployeeposition = req.query.typeemployeeposition;
    var condition = typeemployeeposition ? { typeemployeeposition: { $regex: new RegExp(typeemployeeposition), $options: "i" } } : {};

    Employeeposition.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employeepositions."
            });
        });
};
// Find a single employeeposition with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Employeeposition.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found employeeposition with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving employeepositionwith id=" + id });
        });
};

// Update a employeeposition by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Employeeposition.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update employeeposition with id=${id}. Maybe employeeposition was not found!`
                });
            } else res.send({ message: "employeeposition was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating employeeposition with id=" + id
            });
        });
};

// Delete a employeeposition with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employeeposition.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete employeeposition with id=${id}. Maybe employeeposition was not found!`
                });
            } else {
                res.send({
                    message: "employeeposition was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete employeeposition with id=" + id
            });
        });
};

// Delete all employeepositions from the database.
exports.deleteAll = (req, res) => {
    Employeeposition.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} employeepositions were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all employeepositions."
            });
        });
};
// Find all published employeepositions
exports.findAllPublished = (req, res) => {
    Employeeposition.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employeepositions."
            });
        });
};