const Routes = {
  root: '/app',
  login: '/app/login',
  signup: '/app/signup',
  dashboard: '/app/my',
  recipes: '/app/my/recipes',
  newRecipe: '/app/my/recipes/new',
  recipe: '/app/my/recipes/:id',
  editRecipe: '/app/my/recipes/:id/edit',
  settings: '/app/my/settings',
  recipePath(recipeId) {
    return this.recipe.replace(':id', recipeId)
  }
}

export default Routes;