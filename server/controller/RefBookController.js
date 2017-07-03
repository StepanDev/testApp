const addressData = require('../models/addressData');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
module.exports = {
    getSettlement: getSettlement,
    addSettlement: addSettlement,
    updateSettlement:updateSettlement,
    removeAddressData:removeAddressData
};

function addSettlement(req,res) {
    let addrData = req.body;
    addressData.save(addrData);
}

function updateSettlement() {
    let addrData = {};
    addressData.update({_id:req.body.id},{$set:addrData}).then(function (updatedItem) {

    }).catch(function (err) {
        console.trace(err);
        res.send(err);
    })
}

function getSettlement(req, res) {
    addressData.aggregate({$match:{_id: new ObjectId(req.query.settlement)}}).then(function (item) {
        res.send(item);
    })
}

function removeAddressData(req,res) {

}