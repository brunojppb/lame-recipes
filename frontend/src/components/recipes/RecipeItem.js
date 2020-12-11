import React from 'react';

export default function RecipeItem() {

  return(
    <div className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-1 flex flex-col items-center relative">
      <div className="bg-white shadow-lg rounded-md mt-5">
        <img
          src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
          className="rounded-t-md object-cover w-full h-40"
          alt="recipe"
        />
        <div className="py-3 px-3">
          <span className="font-bold text-gray-800 text-lg">Home-made Pizza</span>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 font-light">
              <div>
                <span className="font-medium">Serving:</span> 2 People
              </div>
              <div>
                <span className="font-medium"># of ingredients:</span> 5
              </div>
            </div>
            <div className="text-2xl text-red-600 font-bold">
              20 min
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}