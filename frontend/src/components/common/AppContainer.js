import React from 'react';
import AppLayout from "./layout/AppLayout";
import {Switch, Route, Redirect} from "react-router-dom";
import RecipeList from "../recipes/RecipeList";
import Routes from "../../routes";
import NewRecipe from "../recipes/NewRecipe";

export default function AppContainer() {

  return (
    <main className="relative">
      <AppLayout>
        <Switch>
          <Route path={Routes.dashboard} exact>
            <Redirect to={Routes.recipes}/>
          </Route>
          <Route path={Routes.recipes} exact>
            <RecipeList/>
          </Route>
          <Route path={Routes.newRecipe} exact>
            <NewRecipe/>
          </Route>
        </Switch>
      </AppLayout>
    </main>
  )

}