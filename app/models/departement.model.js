
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            nomdepartement: { type: String, required: true },


            employee: { type: Schema.Types.ObjectId, ref: 'Employee' }


        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Departement = mongoose.model("Departement", schema);
    return Departement;
};