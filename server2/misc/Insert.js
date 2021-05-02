const Material = require("../models/Materials");
const Data = require("./data");

const inserData = () => {
    Data.forEach((material) => {
        const Mats = new Material({
            materialName:material.nazevSuroviny,
        })
        Mats.save((err,data) => {
            if(err) throw new Error("Něco se nepovedlo");
            console.log(data)
        });
    });
}
module.exports = inserData;