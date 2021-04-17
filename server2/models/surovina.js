const mongoose = require("mongoose");
const recept = new mongoose.Schema({
    nazevSuroviny:{
        type:String,
    }
})

module.exports = mongoose.model("Surovina", recept);