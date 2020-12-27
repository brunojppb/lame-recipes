import {gql} from "@apollo/client";

export const NEW_RECIPE_MUTATION = gql`
    mutation createRecipe($input: RecipeInput!) {
        newRecipe: createRecipe(input: $input) {
            id
            name
            content
        }
    }
`;

export const UPLOAD_IMAGE_MUTATION = gql`
    mutation uploadImage($file: Upload!) {
        image: uploadImage(file: $file) {
            id
            url
        }
    }
`;