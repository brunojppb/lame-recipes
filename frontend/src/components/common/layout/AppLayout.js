import React from 'react';
import Header from "./Header";
import SideMenu from "./SideMenu";

export default function AppLayout({children}) {

  return (
    <>
      <main className="flex w-full h-screen">
        <SideMenu/>
        <section className="w-full p-4">
          <div className="w-full h-64 border-dashed p-4 text-md">
            {children}
          </div>
        </section>

      </main>
    </>
  )

}