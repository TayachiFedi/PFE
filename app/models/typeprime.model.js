
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            typeprime: String,

            prime: {
                type: Schema.Types.ObjectId, ref: 'Prime'
            }

        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Typeprime = mongoose.model('Typeprime', schema);
    return Typeprime;
};  