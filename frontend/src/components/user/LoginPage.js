import React from 'react';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import {gql, useMutation} from "@apollo/client";

import CenterLayout from "../common/CenterLayout";
import Routes from "../../routes";
import LockIcon from "../icons/LockIcon";
import {useAuth} from "../auth/AuthProvider";

const LOGIN_MUTATION = gql`
    mutation signin($input: SigninInput!) {
        user: signin(input: $input) {
            name
            email
        }
    }
`;

export default function LoginPage() {
  const history = useHistory()
  const {register, handleSubmit} = useForm()
  const {setUser} = useAuth()
  const [signin, {loading}] = useMutation(LOGIN_MUTATION)

  const onSubmit = async (data) => {
    const {email, password} = data;
    try {
      const {data} = await signin({
        variables: {
          input: {
            email,
            password
          }
        }
      });
      const {user} = data;
      if (user) {
        setUser(user);
        history.replace(Routes.recipes)
      }
    } catch (e) {
      console.log('could not login', e)
    }
  }

  return(
    <CenterLayout padding="size-10">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
            Lame Recipes
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <RouterLink to={Routes.signup} className="font-medium text-blue-600 hover:text-gray-500">
              New around here? Create your account
            </RouterLink>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="remember" value="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address"
                     name="email"
                     type="email"
                     autoComplete="email"
                     ref={register}
                     required
                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="Email address"/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password"
                     ref={register}
                     name="password"
                     type="password"
                     autoComplete="current-password"
                     required
                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="Password"/>
            </div>
          </div>

          <button type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'disabled:bg-gray-200' : ''}`}>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockIcon/>
              </span>
            Sign in
          </button>
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </CenterLayout>
  )

}