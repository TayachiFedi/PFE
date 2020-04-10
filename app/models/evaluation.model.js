
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            typeevaluation: String,
            dateevaluation: Date,



            employee: { type: Schema.Types.ObjectId, ref: 'Employee' }


        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Evaluation = mongoose.model("Evaluation", schema);
    return Evaluation;
};