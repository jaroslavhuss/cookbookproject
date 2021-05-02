const getRecept = require("express").Router();
const receipt = require("../../models/receipt");

getRecept.post("/get-receipt/",(req,res) => {
    receipt.find({ 'fullText' : { '$regex' : req.body.fullText, '$options' : 'i' } }, (err,documents) => {
        const docsLength = documents.length;
        if(err){
         return res.json({
                msg:"Bohužel během vyhleádávní došlo k chybě",
                data:[]
            })
        }
        return res.json({
          msg:docsLength<1?"Na váš dotaz jsme nenašli žádné recepty":`Váš dotaz odpovídá ${docsLength===1?"1 receptu":docsLength > 1 && docsLength < 4 ? docsLength+" recepty" :docsLength+ " receptů"}`,
          data:documents
        });
    })
})

module.exports = getRecept;
