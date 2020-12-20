import {gql} from "@apollo/client";

export const QUERY_MY_RECIPES = gql`
    query getRecipes {
        recipes: getAllRecipes {
            id
            name
            content
        }
    }
`;