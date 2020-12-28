import React from 'react';
import Loader from "../common/Loader";
import {useQuery} from "@apollo/client";
import {useParams} from 'react-router-dom';

import {GET_RECIPE} from "../../graphql/queries";

export default function RecipePage() {

  const {id} = useParams()
  const {loading, error, data} = useQuery(GET_RECIPE, {
    variables: {id},
  })

  if (loading) return <Loader/>
  if (error) return 'Could not load recipe.'
  const {recipe} = data;

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-sm rounded overflow-hidden shadow-lg my-2">
        {recipe.cover && <img className="w-full" src={recipe.cover.url} alt={recipe.name}/>}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{recipe.name}</div>
          <p className="text-grey-darker text-base">
            {recipe.content}
          </p>
        </div>
      </div>
    </div>
  )
}