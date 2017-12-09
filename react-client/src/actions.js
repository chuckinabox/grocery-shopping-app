export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";
export const SET_SINGLE_RECIPE = "SET_SINGLE_RECIPE";
export const SET_RECIPES = "SET_RECIPES";

export function getRequest() {
  return {
    type: GET_REQUEST
  };
}

export function getRequestSuccess() {
  return {
    type: GET_REQUEST_SUCCESS
  };
}

export function getRequestFailure(errors) {
  return {
    type: GET_REQUEST_FAILURE,
    errors
  };
}

export function setSingleRecipe(data) {
  return {
    type: SET_SINGLE_RECIPE,
    data
  };
}

export function setRecipes(data) {
  return {
    type: SET_RECIPES,
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

export function getRecipes() {
  return dispatch => {
    console.log("Request Top/Random Recipes");
    dispatch(getRequest());
    fetch("/api/top")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }
        return response.json();
      })
      .then(json => {
        dispatch(setRecipes(json.data));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}

export function getRecipesSearch(searchUrl) {
  return dispatch => {
    console.log(`Request Search ${searchUrl}`);
    dispatch(getRequest());
    fetch(`/api/search${searchUrl}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }
        return response.json();
      })
      .then(json => {
        dispatch(setRecipes(json.data));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}
