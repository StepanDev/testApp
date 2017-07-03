const mongoose = require('mongoose'), Schema = mongoose.Schema;

const addressTypeSchema = new mongoose.Schema({
        name_ru: {
            type: String
        },
        name_kz: {
            type: String
        },
        name_en: {
            type: String
        },

        ref_ids: [
            {
                type: Number,
                ref: 'addressType'
            }
        ]
    },
    {collection: "address_type"}
);

module.exports = mongoose.model('addressType', addressTypeSchema);