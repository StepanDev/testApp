const mongoose = require('mongoose'), Schema = mongoose.Schema;

const addressSubTypeSchema = new mongoose.Schema({
        name_ru: {
            type: String
        },
        name_kz: {
            type: String
        },
        name_en: {
            type: String
        }
    },
    {collection: "address_subtype"}
);

module.exports = mongoose.model('addressSubType', addressSubTypeSchema);