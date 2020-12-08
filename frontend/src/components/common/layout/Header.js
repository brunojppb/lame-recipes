import React from 'react';
import UserIcon from "../../icons/UserIcon";

export default function Header() {
  return(
    <header className="w-full bg-blue-900 p-4 flex justify-between items-center absolute">
      <nav className="flex items-center">
        <div className="text-white text-xs hidden sm:block ml-2">
          <a href="#" className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer">Lame Recipes Logo</a>
        </div>
      </nav>
      <div className="w-8 h-8 cursor-pointer">
        <UserIcon className="text-white"/>
      </div>
    </header>
  )
}