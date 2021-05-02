const recieveMaterials = require("express").Router();
const Materials = require("../../models/materials");

recieveMaterials.get("/recieve-materials", async (req,res) => {
   Materials.find({}, (err,docs) => {
         if(err){
           return  res.json({
                 msg:"Server není připojený k databázi"
             })
         }
        if(docs){
          return  res.json(
                {
                data:docs,
            msg:"Data byla získána"
        })
        }else{
          return  res.json({
                data:[],
                msg:"Bohužel, nešlo načíst seznam potravin"
            })
        }
    }).catch(() => {
        console.log("Server není připojený k databázi")
    })


})

module.exports = recieveMaterials;
