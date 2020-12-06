import 'normalize.css';
import {Provider, defaultTheme} from '@adobe/react-spectrum';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import RedirectAuthUserRoute from "./components/common/RedirectAuthUserRoute";
import LoginPage from "./components/user/LoginPage";
import Routes from "./routes";
import AuthProvider from "./components/auth/AuthProvider";

export default function App() {
  return (
    <Provider theme={defaultTheme}>
      <AuthProvider>
        <Router>
          <Switch>
            <RedirectAuthUserRoute path={Routes.login} exact>
              <LoginPage/>
            </RedirectAuthUserRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </Provider>
  );

}
