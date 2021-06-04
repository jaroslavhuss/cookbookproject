const deleteRecipe = require("express").Router();
const recipe = require("../../models/receipt");

deleteRecipe.post("/delete-recipe", async (req,res) => {
    const {_id} = req.body;
console.log(_id)
    try {
      await recipe.findOneAndDelete({_id:_id});
        return res.json({
            msg:"Recept byl smazán"
        })
    } catch (error) {
        console.log(error)
      res.json({msg: 'Bohužel došlo k neznáme chybě - server se nepřipojil asi k DB'});
    }
});

module.exports = deleteRecipe;
