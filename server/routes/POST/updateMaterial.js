const updateMaterial = require("express").Router();
const material = require("../../models/materials");

updateMaterial.post("/update-material", async (req,res) => {
    const {materialName,_id} = req.body;

    try {
        const update = {
            "$set": {
            materialName
            }
          };
      const data = await material.findOneAndUpdate({_id:_id}, update);
     
    if (data){
      return res.status(200).json({
        msg:"Materiál byl úspěšně aktualizován"
      });
    }else{
      return res.status(406).json({
        msg:"Bohužel takový materiál nemáme v databázi"
      });
    }
      
    } catch (error) {
      res.json({msg: 'Bohužel došlo k neznáme chybě - server se nepřipojil asi k DB'});
    }
});

module.exports = updateMaterial;
