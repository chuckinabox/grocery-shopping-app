//API REQUESTS/Fetches
export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";
//Setters
export const SET_COOKIE = "SET_COOKIE";
export const SET_RECIPES = "SET_RECIPES";
export const SET_SINGLE_RECIPE = "SET_SINGLE_RECIPE";
export const SET_SEARCH_RECIPES = "SET_SEARCH_RECIPES";
export const SET_SAVED_RECIPES = "SET_SAVED_RECIPES";
export const SET_GOING_TO_COOK_RECIPES = "SET_GOING_TO_COOK_RECIPES";

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

export function setCookie(data) {
  return {
    type: SET_COOKIE,
    data
  };
}

export function setRecipes(data) {
  return {
    type: SET_RECIPES,
    data
  };
}

export function setSingleRecipe(data) {
  return {
    type: SET_SINGLE_RECIPE,
    data
  };
}

export function setSearchRecipes(data) {
  return {
    type: SET_SEARCH_RECIPES,
    data
  };
}

export function setSavedRecipes(data) {
  return {
    type: SET_SAVED_RECIPES,
    data
  };
}

export function setGoingToCookRecipes(data) {
  return {
    type: SET_GOING_TO_COOK_RECIPES,
    data
  };
}

export function setSingleRecipeFromId(id, recipes, searchRecipes) {
  return dispatch => {
    let index = 0;
    let found = false;
    for (var i = 0; i < recipes.length; i++) {
      if (recipes[i].id.toString() === id.toString()) {
        index = i;
        found = true;
      }
    }
    if (found) {
      dispatch(setSingleRecipe(recipes[index]));
    } else {
      for (var j = 0; j < searchRecipes.length; j++) {
        if (searchRecipes[j].id === id) {
          index = j;
          found = true;
        }
      }
      if (found) {
        dispatch(setSingleRecipe(searchRecipes[index]));
      } else {
        dispatch(getRecipeFromId(id));
      }
    }
  };
}

export function getRecipeFromId(id) {
  return dispatch => {
    fetch(`/api/recipe/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }

        return response.json();
      })
      .then(json => {
        dispatch(setSingleRecipe(json[0]));
      })
      .catch(error => {
        console.log(error);
        dispatch(getRequestFailure(error));
      });
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
        console.log("DSDSDS");
        dispatch(
          setSearchRecipes({
            rpp: "10",
            pg: "1",
            resultCount: 0,
            results: []
          })
        );
        dispatch(getRequestFailure(error));
      });
  };
}
