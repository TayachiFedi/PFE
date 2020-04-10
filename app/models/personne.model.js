
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nom: {
                type: String,
                minlength: 2,
                maxlength: 30,
                required: true
            },
            prenom: {
                type: String,
                minlength: 2,
                maxlength: 30,
                required: true
            },
            datedenaissance: {
                type: Date,
                required: true
            },
            lieudenaissance: {
                type: String,
                required: true
            },
            paysdenaissance: {
                type: String,
                minlength: 5,
                maxlength: 30,
                required: true
            },
            sexe: {
                type: String,
                required: true,
                enum: ['Homme', 'Femme']
            },
            adresse: {
                type: String,
                required: true
            },
            cin: {
                type: Number,
                required: true
            },
            tel: {
                type: Number,
                required: true
            },
            statusmatrimoniel: {
                type: String,
                required: true
            },

            employee: { type: Schema.Types.ObjectId, ref: 'Employee' }

        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Personne = mongoose.model("Personne", schema);
    return Personne;
}; 