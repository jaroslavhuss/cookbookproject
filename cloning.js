const  deleteRecipeDtoIn = {
    _id: "60b934b6e03b5c0022fbb44d", // Id of a recipe to be deleted
  };

  const deleteRecipeDtoInType = shape({
    _id: string(200),
  })

  const deleteRecipeDtoOut = {
    msg:"Recept byl úspěšně smazán",
    uuAppErrorMap: {
      msg:"Recept není v databázi"
    } //uuApp standard errorMap
  };