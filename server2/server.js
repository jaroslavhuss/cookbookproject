const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const {dbConnect} = require("./databse/connect");
const saveRecipe = require("./routes/saveRecipe");
const saveSurovinu = require("./routes/saveSurovina");
const getSuroviny = require("./routes/getSurovina");
const getRecept = require("./routes/getRecept");
const cors = require("cors");

/**
 * MIDDLEWARE
 */

 app.use(express.text({ extended: false }));
 app.use(express.json({ extended: false }));

/**
 * Připojení k databázi
 * 
 * S databází opatrně při vývoji, raději používejte dummy data! 
 */
new dbConnect().connect();

/**
 * ROUTY POST
 */
app.use("/",cors(), saveRecipe);
app.use("/",cors(), saveSurovinu);
app.use("/",cors(), getSuroviny);
app.use("/",cors(), getRecept);

/**
 * ROUTY GET
 */
app.get("/", (req,res) => {
    res.send("Ahoj");
})

/**
 * Běh serveru
 */
app.listen(PORT, (err) => {
    if(err) throw new Error("Server nebylo možné nastartovat");
    console.log(`
    =============================================
    Server běží na adrese http://localhost:${PORT}
    `);
    console.table([
        { 
         Popis: "Uloží celý recept",
         URL:"http://localhost:5000/save-recipe",
         Metoda: "POST" 
        },
        { 
         Popis: "Uloží surovinu, pokud ještě neexistuje",
         URL:"http://localhost:5000/save-surovina",
         Metoda: "POST" 
        },
        { 
            Popis: "Získá hledané recepty",
            URL:"http://localhost:5000/get-recept",
            Metoda: "POST" 
        },
        { 
         Popis: "Získá seznam všech surovin",
         URL:"http://localhost:5000/get-suroviny",
         Metoda: "GET" 
        },
        
      ]
    )
});