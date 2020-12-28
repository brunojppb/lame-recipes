import React from 'react';
import {Link as RouterLink, useHistory} from "react-router-dom";
import Routes from "../../routes";
import CenterLayout from "../common/CenterLayout";
import {useForm} from "react-hook-form";
import {gql, useMutation} from "@apollo/client";

const SIGNUP_MUTATION = gql`
    mutation signUp($input: SignupInput!) {
        user: signUp(input: $input) {
            name
            email
        }
    }
`

export default function SignupPage() {

  const {register, handleSubmit} = useForm();
  const history = useHistory()
  const [signUp, {loading}] = useMutation(SIGNUP_MUTATION)

  const onSubmit = async (data) => {
    const {name, email, password, passwordConfirmation} = data;
    try {
      await signUp({
        variables: {
          input: {
            name,
            email,
            password,
            passwordConfirmation
          }
        }
      })
      // TODO: Notify about account creation
      history.replace(Routes.login)
    } catch (e) {
      console.log('could not signup', e)
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
            <RouterLink to={Routes.login} className="font-medium text-blue-600 hover:text-gray-400 dark:text-gray-100">
              Have an account already? Login here.
            </RouterLink>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Email address</label>
              <input id="name"
                     name="name"
                     type="text"
                     ref={register}
                     required
                     className="appearance-none rounded-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="Name"/>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address"
                     name="email"
                     type="email"
                     autoComplete="email"
                     ref={register}
                     required
                     className="mt-2 appearance-none rounded-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="Email address"/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password"
                     ref={register}
                     name="password"
                     type="password"
                     required
                     className="appearance-none rounded-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                     placeholder="Password"/>
            </div>
            <div>
              <label htmlFor="passwordConfirmation" className="sr-only">Password Confirmation</label>
              <input id="passwordConfirmation"
                     ref={register}
                     name="passwordConfirmation"
                     type="password"
                     required
                     className="appearance-none rounded-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                     placeholder="Password"/>
            </div>
          </div>

          <button type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${false ? 'disabled:bg-gray-200' : ''}`}>
            Create Account
          </button>
        </form>
      </div>
    </CenterLayout>
  )

}