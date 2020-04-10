const db = require("../models");
const Employee = db.employees;
const mongoose = require('mongoose');
// Create and Save a new employee
exports.create = (req, res) => {
    // Validate request
    if (!req.body.codeimmatriculation) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a employee
    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        codeimmatriculation: req.body.codeimmatriculation,

        //aggregation requirement

        departement: req.body.departementId,
        banque: req.body.banqueId,
        evaluation: req.body.evaluationId,
        presence: req.body.presenceId,
        employeeposition: req.body.employeepositionId,
        contrat: req.body.contratId,
        personne: req.body.personneId,
        published: req.body.published ? req.body.published : false
    });




    // Save employee in the database
    employee
        .save(employee)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the employee."
            });
        });
};


// Retrieve all employee from the database.
exports.findAll = (req, res) => {
    const nom = req.query.nom;
    var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};

    Employee.find(condition)
        .populate('departement + banque + evaluation + presence + employeeposition + contrat + personne ')
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                contrat: docs.map(doc => {
                    return {
                        _id: doc._id,

                        codeimmatriculation: doc.codeimmatriculation,
                        departement: doc.departement,
                        banque: doc.banque,
                        evaluation: doc.evaluation,
                        presence: doc.presence,
                        employeeposition: doc.employeeposition,
                        contrat: doc.contrat,
                        personne: doc.personne,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/contrats/' + doc._id
                        }

                    }
                })
            })
        })
};
// Find a single employee with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Employee.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found employee with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving employeewith id=" + id });
        });
};

// Update a employee by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update employee with id=${id}. Maybe employee was not found!`
                });
            } else res.send({ message: "employee was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating employee with id=" + id
            });
        });
};

// Delete a employee with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Employee.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete employee with id=${id}. Maybe employee was not found!`
                });
            } else {
                res.send({
                    message: "employee was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete employee with id=" + id
            });
        });
};

// Delete all employees from the database.
exports.deleteAll = (req, res) => {
    Employee.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} employees were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all employees."
            });
        });
};
// Find all published employees
exports.findAllPublished = (req, res) => {
    Employee.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        });
};