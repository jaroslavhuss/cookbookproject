const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./databse/connect");
const getSuroviny = require("./routes/GET/recieveMaterials");
const saveRecipe = require("./routes/POST/saveRecipe");
const saveSurovinu = require("./routes/POST/saveSurovina");
const getRecept = require("./routes/POST/getRecept");
const cors = require("cors");
const recieveMaterials = require("./routes/GET/recieveMaterials");

/**
 * MIDDLEWARE
 * Povoluje komunikaci skrze JSON a text
 */

 app.use(express.text({ extended: false }));
 app.use(express.json({ extended: false }));

/**
 * Připojení k databázi
 * 
 * S databází opatrně při vývoji, raději používejte dummy data! 
 */
db.connect();

/**
 * ROUTY POST
 */
app.use("/",cors(), saveRecipe);
app.use("/",cors(), saveSurovinu);
app.use("/",cors(), recieveMaterials);
app.use("/",cors(), getRecept);

/**
 * ROUTY GET
 */
app.get("/", (req,res) => {
    res.send("Ahoj");
})

/**
 * Nastartuje server a vypíše všechny routy
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
         URL:"http://localhost:5000/recieve-materials",
         Metoda: "GET" 
        },
        
      ]
    )
});