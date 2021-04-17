const getSuroviny = require("express").Router();
const Surovina = require("../models/surovina");

getSuroviny.get("/get-suroviny", async (req,res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*');
const sampleData = [
    {nazevSuroviny:"Čočka"},
    {nazevSuroviny:"Hovězí"},
    {nazevSuroviny:"Pepř"},
    {nazevSuroviny:"Prdel"},
    {nazevSuroviny:"Křen"},
    {nazevSuroviny:"Prase"},
    {nazevSuroviny:"Jelito"},
    {nazevSuroviny:"Karel"},
    {nazevSuroviny:"Marek"},
    {nazevSuroviny:"Nanuk"},
    {nazevSuroviny:"Eskymák"},
    {nazevSuroviny:"Čokoláda"},
    {nazevSuroviny:"Masakr"},
    {nazevSuroviny:"MBPro"},
    {nazevSuroviny:"Zeď"},
    {nazevSuroviny:"Fotka"},
    {nazevSuroviny:"Kua"},
    {nazevSuroviny:"Asdfas"},
    {nazevSuroviny:"JSjkSLS"},
    {nazevSuroviny:"omg"},
    {nazevSuroviny:"Karel"},
    {nazevSuroviny:"Ředkev"},
    {nazevSuroviny:"Hukot"},
    {nazevSuroviny:"Fuak"},
    {nazevSuroviny:"Pařina"},
    {nazevSuroviny:"Laos"},
    {nazevSuroviny:"Heo"},
    {nazevSuroviny:"Deo"},
]
//res.json({data:sampleData,msg:"Data byla získána"});


   Surovina.find({}, (err,docs) => {
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

module.exports = getSuroviny;