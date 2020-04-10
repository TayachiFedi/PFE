
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            nombanque: {
                type: String,
                minlength: 2,
                maxlength: 30,
                required: true
            },
            adressebanque: {
                type: String,
                minlength: 6,
                maxlength: 30,
                required: true
            },
            telbanque: {
                type: Number,

                required: true
            },
            faxbanque: Number,





            employee: { type: Schema.Types.ObjectId, ref: 'Employee' }
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Banque = mongoose.model("Banque", schema);
    return Banque;
};