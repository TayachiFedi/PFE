
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,

            valeurprime: { type: Number, required: true },
            dateaffectation: { type: Date, required: true },



            typeprime: { type: Schema.Types.ObjectId, ref: 'Typeprime', required: true },
            contrat: { type: Schema.Types.ObjectId, ref: 'Contrat', required: true }
        },




        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Prime = mongoose.model("Prime", schema);
    return Prime;
};