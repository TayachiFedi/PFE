
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            nomposition: { type: String, required: true },

            contrat: { type: Schema.Types.ObjectId, ref: 'Contrat' }

        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Employeeposition = mongoose.model("Employeeposition", schema);
    return Employeeposition;
}; 