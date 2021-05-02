const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./database/connect");
const saveRecipe = require("./routes/POST/saveRecipe");
const saveMaterial = require("./routes/POST/saveMaterial");
const getRecept = require("./routes/POST/getRecept");
const recieveMaterials = require("./routes/GET/recieveMaterials");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

/**
 * MIDDLEWARE
 * Povoluje komunikaci skrze JSON a text
 */
app.use(express.text());
app.use(express.json());

/**
 * Připojení k databázi
 *
 * S databází opatrně při vývoji, raději používejte dummy data!
 */
db.connect();

/**
 * ROUTY POST
 */
app.use(cors(), saveRecipe);
app.use(cors(), saveMaterial);
app.use(cors(), recieveMaterials);
app.use(cors(), getRecept);

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
         URL:"http://localhost:5000/save-material",
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
