var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            _id: mongoose.Schema.Types.ObjectId,
            dateembauche: { type: Date, required: true },
            salairedebase: { type: Number, required: true },


            typecontrat: {
                type: Schema.Types.ObjectId, ref: 'Typecontrat', required: true
            },

            gestioncnss: [{
                type: Schema.Types.ObjectId, ref: 'Gestioncnss', required: true
            }],
            prime: [{ type: Schema.Types.ObjectId, ref: 'Prime', required: true }],

            employeeposition: [{ type: Schema.Types.ObjectId, ref: 'Employeeposition', required: true }],



            //Contrat to employee

            employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true }


        },

        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Contrat = mongoose.model('Contrat', schema);
    return Contrat;
};
