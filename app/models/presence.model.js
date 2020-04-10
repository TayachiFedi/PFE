
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            statut: { type: Boolean, required: true },
            date: { type: Date, required: true },
            nombreheures: { type: Number, required: true },


            gestionpointage: [{
                type: mongoose.Schema.Types.ObjectId, ref: 'Gestionpointage'
            }],

            conge: { type: mongoose.Schema.Types.ObjectId, ref: 'Conge', required: true },

            employee: { type: Schema.Types.ObjectId, ref: 'Employee' }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Presence = mongoose.model('Presence', schema);
    return Presence;
};