const saveRecipe = require("express").Router();
const recipe = require("../../models/receipt");

saveRecipe.post("/update-recipe", async (req,res) => {
    const {nazevReceptu, popis, dobaPripravy, nahledovyObrazek, suroviny, soucetGramaze, fullText,_id} = req.body;

    try {
        const update = {
            "$set": {
            nazevReceptu,
            popis,
            dobaPripravy,
            nahledovyObrazek,
            suroviny,
            soucetGramaze,
            fullText
            }
          };
      const data = await recipe.findOneAndUpdate({_id:_id}, update);
     
   
if(data){
  return res.status(200).json({
    msg:"Recept byl úspěšně aktualizován"
  });
}else{
  return res.status(406).json({
    msg:"Recept nebyl bohužel aktualizován"
  })
}
      
    } catch (error) {
      res.json({msg: 'Bohužel došlo k neznáme chybě - server se nepřipojil asi k DB'});
    }
});

module.exports = saveRecipe;
