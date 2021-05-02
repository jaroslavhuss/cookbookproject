const saveMaterial = require("express").Router();
const Materials = require("../../models/Materials");
saveMaterial.post("/save-material", async (req,res) => {
    const {name} = req.body;
    const saveMaterial = new Materials({
        materialName:name
    })
    //Nejdřív najdi, zda už taková surovina neexistuje
  Materials.findOne({"materialName":name}, (err,data) => {
      if(err){
         return res.json({
              msg:"Bohužel došlo k neznámě chybě nebo server nekomunikuje s DB"
          })
      }
      //Pokud ano, tak už surovinu neukládejme
      if(data!== null){
         return res.json({
              msg:"Bohužel, tuhle surovinu už evidujeme!"
          })
      }else{
          //Jinak ji tady na klid uložíme
          saveMaterial.save((err,msg) => {
              if(msg._id){
             return res.json({
                  msg:"Surovina byla úspěšně uložena v našem seznamu!"
              })
            }else{
            return  res.json({
                msg:"Surovina nemohla být uložena" + err.toString()
                })
            }
          })
      }
  })
})
module.exports = saveMaterial;