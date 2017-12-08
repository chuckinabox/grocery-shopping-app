export const SET_SINGLE_RECIPE = "SET_SINGLE_RECIPE";

export function setSingleRecipe(data) {
  return {
    type: SET_SINGLE_RECIPE,
    data
  };
}

export function setSingleRecipeFromId(id, recipes) {
  return dispatch => {
    let index = 0;
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].id === id) {
        index = i;
      }
    }
    dispatch(setSingleRecipe(recipes[index]));
  };
}
