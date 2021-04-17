const mongoose = require("mongoose");
const recept = new mongoose.Schema({
    nazevReceptu:{
        type:String,
    },
    popis:{
        type:String,
    },
    
    dobaPripravy:{
     type:String,
    },
    nahledovyObrazek:{
        type:String
    },
    suroviny:{
        type:Array,
    },
    soucetGramaze:{
        type:Number,
    },
    fullText:{
        type:String
    }
})

module.exports = mongoose.model("Recipe", recept);