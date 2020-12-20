import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {useAuth} from "../auth/AuthProvider";
import Routes from "../../routes";

export default function ProtectedRoute({ children, ...props }) {
  const { user } = useAuth()

  return (
    <Route
      {...props}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Routes.login,
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}