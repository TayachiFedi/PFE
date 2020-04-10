
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            codeimmatriculation: { type: Number, required: true },



            departement: [{ type: Schema.Types.ObjectId, ref: 'Departement', required: true }],
            banque: [{ type: Schema.Types.ObjectId, ref: 'Banque', required: true }],
            evaluation: [{ type: Schema.Types.ObjectId, ref: 'Evaluation' }],
            presence: [{ type: Schema.Types.ObjectId, ref: 'Presence' }],
            employeeposition: [{ type: Schema.Types.ObjectId, ref: 'Employeeposition' }],

            // employee to contrat

            contrat: [{ type: Schema.Types.ObjectId, ref: 'Contrat', required: true }],
            // pers to emp

            personne: [{ type: Schema.Types.ObjectId, ref: 'Personne', required: true }]

        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Employee = mongoose.model("Employee", schema);
    return Employee;
};