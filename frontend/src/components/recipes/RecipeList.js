import React from 'react';
import RecipeItem from "./RecipeItem";
import {useQuery} from "@apollo/client";
import {QUERY_MY_RECIPES} from "../../graphql/queries";
import Loader from "../common/Loader";

export default function RecipeList() {

  const {loading, error, data} = useQuery(QUERY_MY_RECIPES)

  if (loading) return <Loader/>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">My Recipes</h2>
      <div className="grid grid-cols-4 gap-4">
        {data.recipes.map(r => <RecipeItem key={r.id} id={r.id} name={r.name} cover={r.cover}/>)}
      </div>
    </>
  )

}