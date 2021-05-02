const saveRecipe = require("express").Router();
const recipe = require("../../models/receipt");

saveRecipe.post("/save-recipe", async (req,res) => {
    const {nazevReceptu, popis, dobaPripravy, nahledovyObrazek, suroviny, soucetGramaze, fullText} = req.body;
    const ulozeniReceptu = new recipe({
        nazevReceptu, popis, dobaPripravy, nahledovyObrazek, suroviny, soucetGramaze, fullText
    });

    try {
      const data = await recipe.findOne({"nazevReceptu":nazevReceptu});

      if (data) {
        return res.json({
          msg: "Recept s tímto jménem již evidujeme v naší databázi. Prosím, změnte název receptu"
        });
      }

      const {_id} = await ulozeniReceptu.save();

      if (_id) {
        return res.json({
          msg:"Recept byl úspěšně uložen"
        });
      }

      return res.json({
        msg:"Recept byl úspěšně uložen"
      });
    } catch (error) {
      res.json({msg: 'Bohužel došlo k neznáme chybě - server se nepřipojil asi k DB'});
    }
});

module.exports = saveRecipe;
