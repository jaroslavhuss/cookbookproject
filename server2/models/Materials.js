const mongoose = require("mongoose");
const Materials = new mongoose.Schema({
    materialName:{
        type:String,
    }
})

module.exports = mongoose.model("Material", Materials);