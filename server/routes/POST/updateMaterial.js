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
     
    console.log(data)

      return res.json({
        msg:"Materiál byl úspěšně aktualizován"
      });
    } catch (error) {
      res.json({msg: 'Bohužel došlo k neznáme chybě - server se nepřipojil asi k DB'});
    }
});

module.exports = updateMaterial;
