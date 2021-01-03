import {useState, useCallback, useEffect} from 'react';
import {useMutation} from "@apollo/client";
import {useLocation} from 'react-router-dom';

import NavbarItem from "./NavbarItem";
import UserIcon from "../../icons/UserIcon";
import PlusIcon from "../../icons/PlusIcon";
import HeartIcon from "../../icons/HeartIcon";
import Routes from "../../../routes";
import ExitArrow from "../../icons/ExitArrow";
import {useAuth} from "../../auth/AuthProvider";
import {useNotification} from "../NotificationProvider";
import {LOGOUT_MUTATION} from "../../../graphql/mutations";
import useMedia from "../../../hooks/useMedia";

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
];

export default function Navbar() {

  const [signOut] = useMutation(LOGOUT_MUTATION)
  const {onSignOut} = useAuth()
  const {showError} = useNotification()
  const isDesktop = useMedia(['(min-width: 640px)'], [true], false);
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);
  const location = useLocation()

  const toggleMenu = useCallback(() => {
    setIsMobileMenuExpanded(v => !v)
  }, [])

  useEffect(() => {
    if (isMobileMenuExpanded && !isDesktop) {
      toggleMenu()
    }
  }, [location])

  const onLogout = async () => {
    try {
      await signOut()
      onSignOut()
    } catch (e) {
      console.error("Could not logout", e)
      showError('Could not logout.')
    }
  };

  return (
    <header className="fixed left-0 right-0 p-2 bg-gray-800 sm:top-0 mobile-menu">
      <div className="flex flex-row justify-between items-center text-sm">
        <span className="text-white font-bold hidden sm:block">Lame Recipes</span>
        <div className="flex flex-row justify-items-center gap-2 w-full sm:w-auto">
          {menus.map(({IconComponent, label, to}) => (
            <NavbarItem to={to} key={to}>
              <IconComponent className="text-white w-4 h-4"/>
              <div className="w-full text-center text-xs sm:text-sm">
                <span>{label}</span>
              </div>
            </NavbarItem>
          ))}
          <button
            className="rounded items-center p-3 text-white bg-red-700 hover:bg-opacity-70 rounded cursor-pointer text-center text-sm hidden sm:flex sm:flex-row"
            onClick={onLogout}>
            <ExitArrow className="w-4 h-4 mr-2"/>
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}