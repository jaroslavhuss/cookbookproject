const Mongoose = require("mongoose");

class dbConnect {
    connect(){
        Mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
            if (err) throw new Error("Nepodařilo se připojit k databázi...");
            console.log("Připojeno úspěšně k databázi");
        })
    }
}
//
module.exports = new dbConnect();
