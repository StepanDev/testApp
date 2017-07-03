const mongoose = require('mongoose'), Schema = mongoose.Schema;

const addressDataSchema = new mongoose.Schema({
        name_kz: {
            type: String
        },
        name_ru: {
            type: String
        },
        name_en: {
            type: String
        },
        street_name_kz: {
            type: String
        },
        address_type_id: {
            type: Number,
            ref: 'addressType'
        },
        address_subtype_id: {
            type: Schema.Types.ObjectId,
            ref: 'addressSubType'
        },
        parent_ids: [{type: Schema.Types.ObjectId, ref: 'addressData'}]
    },
    {collection: "address_data"}
);

module.exports = mongoose.model('addressData', addressDataSchema);