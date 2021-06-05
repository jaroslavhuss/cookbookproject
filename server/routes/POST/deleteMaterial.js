const deleteMaterial = require("express").Router();
const material = require("../../models/materials");

deleteMaterial.post("/delete-material", async (req,res) => {
    const {_id} = req.body;
console.log(_id)
    try {
      await material.findOneAndDelete({_id:_id});
        return res.json({
            msg:"Materiál byl smazán"
        })
    } catch (error) {
        console.log(error)
      res.json({msg: 'Bohužel došlo k neznáme chybě - server se nepřipojil asi k DB'});
    }
});

module.exports = deleteMaterial;