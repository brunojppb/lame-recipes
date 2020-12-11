import React from 'react';
import AppLayout from "./layout/AppLayout";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import RecipeList from "../recipes/RecipeList";
import Routes from "../../routes";

export default function AppContainer() {

  return (
    <main className="relative">
      <AppLayout>
        <Router>
          <Switch>
            <Route path={Routes.dashboard} exact>
              <Redirect to={Routes.recipes}/>
            </Route>
            <Route path={Routes.recipes} exact>
              <RecipeList/>
            </Route>
          </Switch>
        </Router>
      </AppLayout>
    </main>
  )

}