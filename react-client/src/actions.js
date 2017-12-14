export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";
export const SET_SINGLE_RECIPE = "SET_SINGLE_RECIPE";
export const SET_RECIPES = "SET_RECIPES";
export const SET_COOKIE = "SET_COOKIE";
export const SET_SEARCH_RECIPES = "SET_SEARCH_RECIPES";

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

export function setSearchRecipes(data) {
  return {
    type: SET_SEARCH_RECIPES,
    data
  };
}

export function setCookie(data) {
  return {
    type: SET_COOKIE,
    data
  };
}

export function setSingleRecipeFromId(id, recipes, searchRecipes) {
  return dispatch => {
    let index = 0;
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].id === id) {
        index = i;
      }
    }
    if (index) {
      dispatch(setSingleRecipe(recipes[index]));
    } else {
      for (var i = 0; i < searchRecipes.length; i++) {
        if (searchRecipes[i].id === id) {
          index = i;
        }
      }
      dispatch(setSingleRecipe(searchRecipes[index]));
    }
  };
}

export function getRecipes() {
  return dispatch => {
    dispatch(getRequest());

    fetch("/api/latest")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }

        return response.json();
      })
      .then(json => {
        dispatch(setRecipes(json));
      })
      .catch(error => {
        console.log(error);
        dispatch(getRequestFailure(error));
      });
  };
}

export function getRecipesSearch(searchUrl) {
  return dispatch => {
    dispatch(getRequest());

    fetch(`/api/search${searchUrl}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }
        return response.json();
      })
      .then(json => {
        dispatch(setSearchRecipes(json));
      })
      .catch(error => {
        dispatch(getRequestFailure(error));
      });
  };
}
