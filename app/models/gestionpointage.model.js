
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            heurearrive: { type: Date, required: true },
            heuresortie: { type: Date, required: true },

            presence: { type: Schema.Types.ObjectId, ref: 'Presence' }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Gestionpointage = mongoose.model('Gestionpointage', schema);
    return Gestionpointage;
};  