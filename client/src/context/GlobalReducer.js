const reducer = (state, action) => {
    switch (action.type) {
      case "VYBER_SUROVINU":
        return {
          ...state,
          vybraneSuroviny: [...state.vybraneSuroviny,action.payload],
        };
        
      case "ZAPNI_VYPNI_PANEL_SUROVIN":
        return {
          ...state,
          zapniPanelSVyberemSurovin: action.payload,
        };
      case "SET_VYBRANE_SUROVINY":
        return {
          ...state,
          vybraneSuroviny: action.payload,
        };
      case "SET_VYHLEDANE_RECEPTY":
        return {
          ...state,
          vyhledaneRecepty: action.payload,
        };
      case "SET_ZVOLENY_RECEPT":
        return {
          ...state,
          zvolenyRecept: action.payload,
        };

      default:
        return state;
    }
  };

  export default reducer;