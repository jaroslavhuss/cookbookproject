const saveRecipe = require("express").Router();
const recept = require("../../models/recept");
saveRecipe.post("/save-recipe", async (req,res) => {
    const {nazevReceptu, popis, dobaPripravy, nahledovyObrazek, suroviny, soucetGramaze, fullText} = req.body;
    const ulozeniReceptu = new recept({
        nazevReceptu, popis, dobaPripravy, nahledovyObrazek, suroviny, soucetGramaze, fullText
    })

    recept.findOne({"nazevReceptu":nazevReceptu}, (err,data) => {
        if(err){
           return res.json({msg:"Bohužel došlo k neznáme chybě - server se nepřipojil asi k DB"})
        }
        if(data !== null){
             return  res.json({
                   msg: "Recept s tímto jménem již evidujeme v naší databázi. Prosím, změnte název receptu"
               }) 
        }else{
            ulozeniReceptu.save().then((response) => {
                if(response._id){
                return res.json({
                     msg:"Recept byl úspěšně uložen"
                 })
                }else{
                 return   res.json({
                        msg:"Recept nebyl uložen"
                    })
                }
                 
             }).catch((err) => {
                 if(err){
                    return res.json({
                         msg:err
                     })
                 }
             })
        }
    });
    
    
})
module.exports = saveRecipe;