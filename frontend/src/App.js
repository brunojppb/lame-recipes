import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import RedirectAuthUserRoute from "./components/common/RedirectAuthUserRoute";
import LoginPage from "./components/user/LoginPage";
import Routes from "./routes";
import AuthProvider from "./components/auth/AuthProvider";
import AppContainer from "./components/common/AppContainer";
import {apolloClient} from "./graphql";
import ProtectedRoute from "./components/common/ProtectedRoute";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Router>
          <Switch>
            {/* Our app root sits on top of '/app' */}
            {/* the default root route should redirect. */}
            {/* If the user is already logged in, we should redirect them to the dashboard */}
            <Route path="/" exact>
              <Redirect to={Routes.login}/>
            </Route>
            <RedirectAuthUserRoute path={Routes.root} exact>
              <LoginPage/>
            </RedirectAuthUserRoute>
            <RedirectAuthUserRoute path={Routes.login} exact>
              <LoginPage/>
            </RedirectAuthUserRoute>
            <ProtectedRoute path={Routes.dashboard}>
              <AppContainer/>
            </ProtectedRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );

}
