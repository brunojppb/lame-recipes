import React from 'react';
import SideMenu from "./SideMenu";

export default function AppLayout({children}) {

  return (
    <>
      <div className="flex w-full full-screen-height">
        <SideMenu/>
        <section className="w-full p-4 overflow-y-auto">
          <div className="w-full border-dashed p-4 text-md">
            {children}
          </div>
        </section>

      </div>
    </>
  )

}