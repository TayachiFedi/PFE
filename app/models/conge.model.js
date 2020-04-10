var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            nomconge: {
                type: String,
                required: true
            },
            datedebutconge: {
                type: Date,
                required: true
            },
            datefinconge: {
                type: Date,
                required: true
            },
            dureeconge: String,
            etat: Boolean,
            typeconge: String,


            presence: { type: mongoose.Schema.Types.ObjectId, ref: 'Presence' }

        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Conge = mongoose.model("Conge", schema);
    return Conge;
};