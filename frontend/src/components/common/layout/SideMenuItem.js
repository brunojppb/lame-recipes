import React from 'react';

export default function SideMenuItem({children}) {
  return (
    <div
      className="bg-gray-900 flex items-center gap-2 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
      {children}
    </div>
  )
}