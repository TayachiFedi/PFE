module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nomoffre: { type: String, required: true },
            typeoffre: { type: String, required: true },
            datecreation: { type: Date, required: true },
            datecloture: { type: Date, required: true },
            statutoffre: { type: Boolean, required: true },


        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Offreemploie = mongoose.model("offreemploie", schema);
    return Offreemploie;
};