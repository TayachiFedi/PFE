module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            niveaudetude: { type: String, required: true, enum: ["Bac+3", "Bac+4", "Bac+5", "Bac+6"] },
            disponibilite: { type: Date, required: true },


        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Candidat = mongoose.model("candidat", schema);
    return Candidat;
};