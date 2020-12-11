import React from 'react';
import SideMenuItem from "./SideMenuItem";
import UserIcon from "../../icons/UserIcon";
import PlusIcon from "../../icons/PlusIcon";
import HeartIcon from "../../icons/HeartIcon";

export default function SideMenu() {
  return (
    <aside className="w-80 h-screen bg-gray shadow-md w-fulll hidden sm:block">
      <div className="flex flex-col justify-between h-screen p-4 bg-gray-800">
        <div className="text-sm">
          <div className="bg-gray-900 text-white p-5 rounded cursor-pointer font-bold">Lame Recipes</div>
          <SideMenuItem>
            <HeartIcon className="text-white w-4 h-4"/>
            <div className="flex justify-between items-center w-full">
              <span>My Recipes</span>
              <span className="w-4 h-4 bg-blue-600 rounded-full text-white text-center font-normal text-xs">5</span>
            </div>
          </SideMenuItem>
          <SideMenuItem>
            <PlusIcon className="text-white w-4 h-4"/>
            <span>New Recipe</span>
          </SideMenuItem>
          <SideMenuItem>
            <UserIcon className="text-white w-4 h-4"/>
            <span>Account Settings</span>
          </SideMenuItem>
        </div>

        <div className="flex p-3 text-white bg-red-700 hover:bg-opacity-70 rounded cursor-pointer text-center text-sm">
          <button className="rounded inline-flex items-center">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor">
              <path fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"/>
            </svg>
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}