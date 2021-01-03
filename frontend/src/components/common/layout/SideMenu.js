import { useState, useCallback, useEffect } from 'react';
import {useMutation} from "@apollo/client";
import {useLocation} from 'react-router-dom';

import SideMenuItem from "./SideMenuItem";
import UserIcon from "../../icons/UserIcon";
import PlusIcon from "../../icons/PlusIcon";
import HeartIcon from "../../icons/HeartIcon";
import Routes from "../../../routes";
import ExitArrow from "../../icons/ExitArrow";
import {useAuth} from "../../auth/AuthProvider";
import {useNotification} from "../NotificationProvider";
import MenuIcon from "../../icons/MenuIcon";
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

export default function SideMenu() {

  const [signOut] = useMutation(LOGOUT_MUTATION)
  const {onSignOut} = useAuth()
  const {showError} = useNotification()
  const isDesktop = useMedia(['(min-width: 640px)'], [true], false);
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);
  const location = useLocation()

  const desktopMenuClass = isDesktop ? 'side-menu--desktop' : '';
  const menuButtonHiddenClass = isDesktop ? 'menu-btn-hidden' : '';
  const mobileMenuExpandedClass = (!isDesktop && isMobileMenuExpanded) ? 'side-menu--mobile-shown' : '';

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
    <>
      <aside className={`side-menu full-screen-height bg-gray block relative ${desktopMenuClass} ${mobileMenuExpandedClass}`} >
        <div className="flex flex-col justify-between full-screen-height p-4 bg-gray-800">
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
        <button className={`rounded-lg absolute side-menu-btn bg-gray-800 text-white p-2 pl-4 pr-2 ${menuButtonHiddenClass}`} onClick={toggleMenu}>
          <MenuIcon className="text-white w-4 h-4"/>
          <span className="sr-only">toggle menu</span>
        </button>
      </aside>
      <div className="menu-overlay" style={{display: (!isDesktop && isMobileMenuExpanded) ? 'block' : 'none'}} onClick={toggleMenu}/>
    </>
  );
}