import React from 'react';
import RecipeItem from "./RecipeItem";
import {gql, useQuery} from "@apollo/client";

const MY_RECIPES = gql`
  {
    recipes: getAllRecipes {
      id
      name
    }
  }
`;

export default function RecipeList() {

  const {loading, error, data} = useQuery(MY_RECIPES)

  if (loading) return 'Loading...'
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">My Recipes</h2>
      <div className="grid grid-cols-4 gap-4">
        {data.recipes.map(r => <RecipeItem key={r.id} id={r.id} name={r.name}/>)}
      </div>
    </>
  )

}