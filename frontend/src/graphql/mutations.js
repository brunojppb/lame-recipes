import {gql} from "@apollo/client";

export const SIGNUP_MUTATION = gql`
    mutation signUp($input: SignupInput!) {
        user: signUp(input: $input) {
            name
            email
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation signIn($input: SigninInput!) {
        user: signIn(input: $input) {
            name
            email
        }
    }
`;

export const LOGOUT_MUTATION = gql`
    mutation signOut {
        signOut
    }
`;

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