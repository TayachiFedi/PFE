
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            typecontrat: String,

            contrat: { type: Schema.Types.ObjectId, ref: 'Contrat' }


        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Typecontrat = mongoose.model("Typecontrat", schema);
    return Typecontrat;
}; 