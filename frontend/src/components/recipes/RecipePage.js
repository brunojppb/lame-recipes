import React from 'react';
import Loader from "../common/Loader";
import {useQuery} from "@apollo/client";
import {useParams} from 'react-router-dom';
import styled from 'styled-components'

import recipePlaceholderImg from '../../recipe_placeholder.jpg';
import {GET_RECIPE} from "../../graphql/queries";

const RecipeWrapper = styled.div`
  
  * + * {
    margin-top: 8px;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    margin-top: 12px;
  }
  h1 {
    font-size: 28px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 20px;
  }
  h4, h5, h6 {
    font-size:  18px;
  }
  
  ul {
    margin-top: 16px;
    margin-left: 24px;
  }
  
  li {
    list-style-type: disc;
    margin-top: 4px;
  }
  
  p {
    font-size: 16px;
  }
`

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
      <div className="w-full max-w-screen-sm rounded overflow-hidden shadow-lg my-2">
        <img className="w-full" src={recipe.cover?.url || recipePlaceholderImg} alt={recipe.name}/>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{recipe.name}</div>
          <RecipeWrapper className="text-grey-darker text-base"
                         dangerouslySetInnerHTML={{__html: recipe.html}} />
        </div>
      </div>
    </div>
  )
}