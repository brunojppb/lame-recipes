import React from 'react';
import SideMenu from "./SideMenu";

export default function AppLayout({children}) {

  return (
    <>
      <div className="flex w-full h-screen">
        <SideMenu/>
        <section className="w-full p-4 overflow-y-auto">
          <div className="w-full h-full border-dashed p-4 text-md">
            {children}
          </div>
        </section>

      </div>
    </>
  )

}