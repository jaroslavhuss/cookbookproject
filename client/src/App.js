import React from 'react';
import "./App.css";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Menu from "./components/menu";
import AddRecipe from "./Pages/AddRecipe";
import SERP from "./Pages/Serp";
import DeatilReceptu from "./components/DetailReceptu";
import AdminPanel from "./Pages/AdminPanel";
import UpdateRecipe from "./Pages/UpdateRecipe";
import AdminMaterials from "./Pages/AdminMaterials"
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
      <Route exact path="/admin-panel"  component={AdminPanel}/>
      <Route exact path="/update-recipe"  component={UpdateRecipe}/>
      <Route exact path="/admin-materials"  component={AdminMaterials}/>
    </Switch>
   </BrowserRouter>
   </GlobalProvider>
  )
}

export default App
