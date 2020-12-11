import React from 'react';
import RecipeItem from "./RecipeItem";

export default function RecipeList() {

  return(
    <>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">My Recipes</h2>
      <div className="grid grid-cols-4 gap-4">
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(i =>{
          return <RecipeItem key={i}/>
        })}
      </div>
    </>
  )

}