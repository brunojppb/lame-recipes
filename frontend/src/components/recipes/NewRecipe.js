import React, {useCallback, useState} from 'react';
import {useMutation} from "@apollo/client";
import {useHistory} from 'react-router-dom';

import RecipeForm from "./RecipeForm";
import Routes from "../../routes";
import {NEW_RECIPE_MUTATION} from "../../graphql/mutations";
import {QUERY_MY_RECIPES} from "../../graphql/queries";
import {UPLOAD_IMAGE_MUTATION} from "../../graphql/mutations";

export default function NewRecipe() {

  const [createRecipe, {loading}] = useMutation(NEW_RECIPE_MUTATION)
  const [uploadImage, {loading: isUploading}] = useMutation(UPLOAD_IMAGE_MUTATION)
  const [imageUrl, setImageUrl] = useState(null)
  const history = useHistory()

  const onImageUpload = useCallback(async (file) => {
    try {
      const result = await uploadImage({
        variables: {
          file
        }
      })
      const {url} = result.data.image;
      setImageUrl(url)
    } catch (e) {
      console.error("could not upload: ", e)
    }

  }, [uploadImage])

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
      <RecipeForm isSaving={loading}
                  onImageUpload={onImageUpload}
                  imageUrl={imageUrl}
                  onSave={onSaveRecipe}/>
    </>
  )

}