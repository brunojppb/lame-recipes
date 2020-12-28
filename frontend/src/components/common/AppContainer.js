import React from 'react';
import AppLayout from "./layout/AppLayout";
import {Switch, Route, Redirect} from "react-router-dom";
import RecipeList from "../recipes/RecipeList";
import Routes from "../../routes";
import NewRecipe from "../recipes/NewRecipe";
import RecipePage from "../recipes/RecipePage";

export default function AppContainer() {

  return (
    <main className="relative">
      <AppLayout>
        <Switch>
          <Route path={Routes.dashboard} exact={true}>
            <Redirect to={Routes.recipes}/>
          </Route>
          <Route path={Routes.recipes} exact={true}>
            <RecipeList/>
          </Route>
          <Route path={Routes.newRecipe} exact={true}>
            <NewRecipe/>
          </Route>
          <Route path={Routes.recipe} exact={true}>
            <RecipePage/>
          </Route>
        </Switch>
      </AppLayout>
    </main>
  )

}