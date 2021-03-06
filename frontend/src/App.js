import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import RedirectAuthUserRoute from "./components/common/RedirectAuthUserRoute";
import LoginPage from "./components/user/LoginPage";
import Routes from "./routes";
import AuthProvider from "./components/auth/AuthProvider";
import AppContainer from "./components/common/AppContainer";
import {apolloClient} from "./graphql";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SignupPage from "./components/user/SignupPage";
import {NotificationProvider} from "./components/common/NotificationProvider";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <Switch>
              {/* Our app root sits on top of '/app' */}
              {/* the default root route should redirect. */}
              {/* If the user is already logged in, we should redirect them to the dashboard */}
              <Route path="/" exact>
                <Redirect to={Routes.login}/>
              </Route>
              <RedirectAuthUserRoute path={Routes.root} exact={true}>
                <LoginPage/>
              </RedirectAuthUserRoute>
              <RedirectAuthUserRoute path={Routes.login} exact={true}>
                <LoginPage/>
              </RedirectAuthUserRoute>
              <RedirectAuthUserRoute path={Routes.signup} exact={true}>
                <SignupPage/>
              </RedirectAuthUserRoute>
              <ProtectedRoute path={Routes.dashboard}>
                <AppContainer/>
              </ProtectedRoute>
            </Switch>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ApolloProvider>
  );

}
