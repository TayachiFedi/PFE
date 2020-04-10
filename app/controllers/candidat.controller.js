const db = require("../models");
const Candidat = db.candidats;

// Create and Save a new candidat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.niveaudetude) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a candidat
    const candidat = new Candidat({
        niveaudetude: req.body.niveaudetude,
        disponibilite: req.body.disponibilite,



        published: req.body.published ? req.body.published : false
    });




    // Save candidat in the database
    candidat
        .save(candidat)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the candidat."
            });
        });
};


// Retrieve all candidat from the database.
exports.findAll = (req, res) => {
    const niveaudetude = req.query.niveaudetude;
    var condition = niveaudetude ? { niveaudetude: { $regex: new RegExp(niveaudetude), $options: "i" } } : {};

    Candidat.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving candidats."
            });
        });
};
// Find a single candidat with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Candidat.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found candidat with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving candidatwith id=" + id });
        });
};

// Update a candidat by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Candidat.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update candidat with id=${id}. Maybe candidat was not found!`
                });
            } else res.send({ message: "candidat was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating candidat with id=" + id
            });
        });
};

// Delete a candidat with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Candidat.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete candidat with id=${id}. Maybe candidat was not found!`
                });
            } else {
                res.send({
                    message: "candidat was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete candidat with id=" + id
            });
        });
};

// Delete all candidats from the database.
exports.deleteAll = (req, res) => {
    Candidat.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} candidats were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all candidats."
            });
        });
};
// Find all published candidats
exports.findAllPublished = (req, res) => {
    Candidat.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving candidats."
            });
        });
};