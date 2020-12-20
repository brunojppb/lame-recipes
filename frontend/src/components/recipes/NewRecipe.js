import React from 'react';
import {useMutation} from "@apollo/client";
import {useHistory} from 'react-router-dom';

import RecipeForm from "./RecipeForm";
import Routes from "../../routes";
import {NEW_RECIPE_MUTATION} from "../../graphql/mutations";
import {QUERY_MY_RECIPES} from "../../graphql/queries";

export default function NewRecipe() {

  const [createRecipe, {loading}] = useMutation(NEW_RECIPE_MUTATION)
  const history = useHistory()

  const onSaveRecipe = async (name, content) => {
    try {
      await createRecipe({
        variables: {
          input: {
            name,
            content
          }
        },
        update(cache, { data: { newRecipe } }) {
          const {recipes} = cache.readQuery({query: QUERY_MY_RECIPES})
          const updatedRecipes = [...recipes, newRecipe]
          cache.writeQuery({
            query: QUERY_MY_RECIPES,
            data: {
              recipes: updatedRecipes
            }
          })
        },
      })
      history.push(Routes.recipes)
    } catch (e) {
      console.error("Could not save recipe: ", e)
    }
  }

  return(
    <>
      <h1 className="text-2xl">
        New Recipe
      </h1>
      <RecipeForm isSaving={loading} onSave={onSaveRecipe}/>
    </>
  )

}