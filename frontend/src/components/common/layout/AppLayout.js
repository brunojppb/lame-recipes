import React from 'react';
import Navbar from "./Navbar";

export default function AppLayout({children}) {

  return (
    <>
      <Navbar/>
      <div className="flex w-full full-screen-height pb-20 sm:pb-0 sm:pt-16">
        <section className="w-full p-4 overflow-y-auto">
          {children}
        </section>
      </div>
    </>
  )

}