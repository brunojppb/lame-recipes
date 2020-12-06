import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {useAuth} from "../auth/AuthProvider";
import Routes from "../../routes";

export default function RedirectAuthUserRoute({ children, ...props }) {
  const { user } = useAuth()

  return (
    <Route
      {...props}
      render={({ location }) =>
        user ? (
          <Redirect
            to={{
              pathname: Routes.recipes,
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  )
}