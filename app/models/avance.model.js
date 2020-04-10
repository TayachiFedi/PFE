module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            valeur: Number,
            dateavance: Date,




        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Avance = mongoose.model("avance", schema);
    return Avance;
};