import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import RedirectAuthUserRoute from "./components/common/RedirectAuthUserRoute";
import LoginPage from "./components/user/LoginPage";
import Routes from "./routes";
import AuthProvider from "./components/auth/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to={Routes.login} />
          </Route>
          <RedirectAuthUserRoute path={Routes.login} exact>
            <LoginPage/>
          </RedirectAuthUserRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );

}
