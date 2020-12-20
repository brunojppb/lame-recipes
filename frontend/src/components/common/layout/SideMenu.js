import React from 'react';
import SideMenuItem from "./SideMenuItem";
import UserIcon from "../../icons/UserIcon";
import PlusIcon from "../../icons/PlusIcon";
import HeartIcon from "../../icons/HeartIcon";
import Routes from "../../../routes";
import ExitArrow from "../../icons/ExitArrow";
import {gql, useMutation} from "@apollo/client";
import {useAuth} from "../../auth/AuthProvider";

const menus = [
  {
    IconComponent: HeartIcon,
    label: 'My recipes',
    to: Routes.recipes
  },
  {
    IconComponent: PlusIcon,
    label: 'New Recipe',
    to: Routes.newRecipe
  },
  {
    IconComponent: UserIcon,
    label: 'Settings',
    to: Routes.settings
  }
]

const LOGOUT_MUTATION = gql`
    mutation signOut {
        signOut
    }
`

export default function SideMenu() {

  const [signOut] = useMutation(LOGOUT_MUTATION)
  const {onSignOut} = useAuth()

  const onLogout = async () => {
    console.log('signing out')
    try {
      await signOut()
      onSignOut()
    } catch (e) {
      console.error("Could not logout", e)
    }
  }

  return (
    <aside className="w-80 h-screen bg-gray shadow-md w-fulll hidden sm:block">
      <div className="flex flex-col justify-between h-screen p-4 bg-gray-800">
        <div className="text-sm">
          <div className="bg-gray-900 text-white p-5 rounded cursor-pointer font-bold">Lame Recipes</div>
          {menus.map(({IconComponent, label, to}) => (
            <SideMenuItem to={to} key={to}>
              <IconComponent className="text-white w-4 h-4"/>
              <div className="flex justify-between items-center w-full">
                <span>{label}</span>
              </div>
            </SideMenuItem>
          ))}
        </div>

        <button className="rounded inline-flex items-center flex p-3 text-white bg-red-700 hover:bg-opacity-70 rounded cursor-pointer text-center text-sm" onClick={onLogout}>
          <ExitArrow className="w-4 h-4 mr-2"/>
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  )
}