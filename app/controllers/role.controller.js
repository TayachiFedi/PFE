const db = require("../models");
const Role = db.roles;

// Create and Save a new role
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nomrole) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a role
    const role = new Role({
        nomrole: req.body.nomrole,
        typerole: req.body.typerole,

        published: req.body.published ? req.body.published : false
    });





    // Save role in the database
    role
        .save(role)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the role."
            });
        });
};


// Retrieve all role from the database.
exports.findAll = (req, res) => {
    const nomrole = req.query.nomrole;
    var condition = nomrole ? { nomrole: { $regex: new RegExp(nomrole), $options: "i" } } : {};

    Role.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        });
};
// Find a single role with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Role.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found role with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving rolewith id=" + id });
        });
};

// Update a role by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Role.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update role with id=${id}. Maybe role was not found!`
                });
            } else res.send({ message: "role was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating role with id=" + id
            });
        });
};

// Delete a role with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Role.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete role with id=${id}. Maybe role was not found!`
                });
            } else {
                res.send({
                    message: "role was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete role with id=" + id
            });
        });
};

// Delete all roles from the database.
exports.deleteAll = (req, res) => {
    Role.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} roles were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all roles."
            });
        });
};
// Find all published roles
exports.findAllPublished = (req, res) => {
    Role.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        });
};