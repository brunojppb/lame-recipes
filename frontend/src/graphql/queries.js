import {gql} from "@apollo/client";

export const QUERY_MY_RECIPES = gql`
    query getRecipes {
        recipes: getMyRecipes {
            id
            name
            content
            cover {
                id
                url
            }
        }
    }
`;

export const GET_ME = gql`
    {
        user: getMe {
            name
            email
        }
    }
`;

export const GET_RECIPE = gql`
    query getRecipe($id: ID!) {
        recipe: getRecipe(id: $id) {
            id
            name
            content
            cover {
                url
            }
        }
    }
`;