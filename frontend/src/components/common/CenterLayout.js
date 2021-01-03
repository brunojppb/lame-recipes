import React from 'react';

export default function CenterLayout({children, ...props}) {
  return (
    <div className="min-full-screen-height flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-800" {...props}>
      {children}
    </div>
  )
}