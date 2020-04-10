const db = require("../models");
const Prime = db.primes;
const mongoose = require('mongoose');
// Create and Save a new prime


exports.create = (req, res) => {

    // Validate request
    if (!req.body.valeurprime) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a prime
    const prime = new Prime({

        _id: new mongoose.Types.ObjectId(),
        valeurprime: req.body.valeurprime,
        dateaffectation: req.body.dateaffectation,
        typeprime: req.body.typeprimeId,

        published: req.body.published ? req.body.published : false
    });


    // Save prime in the database
    prime
        .save(prime)

        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the prime."
            });
        });
};


// Retrieve all prime from the database. //yeeeeees
exports.findAll = (req, res) => {
    const nomprime = req.query.nomprime;
    var condition = nomprime ? { nomprime: { $regex: new RegExp(nomprime), $options: "i" } } : {};

    Prime.find(condition)
        .populate('typeprime')
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                prime: docs.map(doc => {
                    return {
                        _id: doc._id,
                        valeurprime: doc.valeurprime,
                        dateaffectation: doc.dateaffectation,
                        typeprime: doc.typeprime,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/api/primes/' + doc._id
                        }

                    }
                })
            })
        })
};



// Find a single prime with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Prime.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found prime with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving primewith id=" + id });
        });
};

// Update a prime by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;


    Prime.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update prime with id=${id}. Maybe prime was not found!`
                });
            } else res.send({ message: "prime was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating prime with id=" + id
            });
        });


};

// Delete a prime with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Prime.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete prime with id=${id}. Maybe prime was not found!`
                });
            } else {
                res.send({
                    message: "prime was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete prime with id=" + id
            });
        });
};

// Delete all primes from the database.
exports.deleteAll = (req, res) => {
    Prime.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} primes were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all primes."
            });
        });
};
// Find all published primes
exports.findAllPublished = (req, res) => {
    Prime.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving primes."
            });
        });
};