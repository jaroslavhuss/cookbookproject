import React from 'react';
import "./App.css";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Menu from "./components/menu";
import AddRecipe from "./Pages/AddRecipe";
import SERP from "./Pages/Serp";
import DeatilReceptu from "./components/DetailReceptu";
import { GlobalProvider } from "./context/GlobalContext";
const App = () => {
  return (
    <GlobalProvider>
   <BrowserRouter>
   <Menu />
    <Switch>
      <Route exact path="/"  component={MainPage}/>
      <Route exact path="/add-recipe"  component={AddRecipe}/>
      <Route exact path="/search-engine-result-page"  component={SERP}/>
      <Route exact path="/detail-receptu"  component={DeatilReceptu}/>
    </Switch>
   </BrowserRouter>
   </GlobalProvider>
  )
}

export default App
