//API REQUESTS/Fetches
export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";
export const SET_SHOULD_SEARCH = "SET_SHOULD_SEARCH";
export const SET_ERROR = "SET_ERROR";
//Setters
export const SET_COOKIE = "SET_COOKIE";
export const SET_RECIPES = "SET_RECIPES";
export const SET_RECIPES_PAGE = "SET_RECIPES_PAGE";
export const SET_SINGLE_RECIPE = "SET_SINGLE_RECIPE";
export const SET_SEARCH_RECIPES = "SET_SEARCH_RECIPES";
export const SET_SAVED_RECIPES = "SET_SAVED_RECIPES";
export const SET_MENU_RECIPES = "SET_MENU_RECIPES";
export const SET_SAVED_RECIPES_IDS = "SET_SAVED_RECIPES_IDS";
export const SET_MENU_RECIPES_IDS = "SET_MENU_RECIPES_IDS";
export const SET_SHOPPING_LIST = "SET_SHOPPING_LIST";
export const SET_SHOPPING_LIST_OPEN = "SET_SHOPPING_LIST_OPEN";
export const SET_EMPTY_SHOPPING_LIST_OPEN = "SET_EMPTY_SHOPPING_LIST_OPEN";
export const SET_DONE_SHOPPING_LIST_OPEN = "SET_DONE_SHOPPING_LIST_OPEN";
export const SET_SHOW_DELETE = "SET_SHOW_DELETE";
export const SET_USERNAME = "SET_USERNAME";

//-----------------------------------
//--Api Url
//-----------------------------------
const API_URL = "";
//example const API_URL= "https://myservessite.com/"

//-----------------------------------
//--Helper Functions
//-----------------------------------

const returnAsyncDeleteArray = (array, item) => {
  const index = array.indexOf(item);
  let newArray = [];
  for (var i = 0; i < array.length; i++) {
    if (i !== index) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};

const responseChecker = response => {
  if (!response.ok && (response.status === 404 || response.status === 500)) {
    getRequestFailure("error with api");
  } else {
    return response.json();
  }
};

const responseCheckerWithNoReturn = response => {
  if (!response.ok && (response.status === 404 || response.status === 500)) {
    getRequestFailure("error with api");
  } else {
    return response;
  }
};
//-----------------------------------
//--Requests
//-----------------------------------

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
    errors: { title: "Api Fault", text: [errors] }
  };
}

export function setError(data) {
  return {
    type: SET_ERROR,
    data
  };
}

//-----------------------------------
//--Setters
//-----------------------------------

export function setShouldSearch(data) {
  return {
    type: SET_SHOULD_SEARCH,
    data
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

export function setRecipesPage(data) {
  return {
    type: SET_RECIPES_PAGE,
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

export function setMenuRecipes(data) {
  return {
    type: SET_MENU_RECIPES,
    data
  };
}

export function setSavedRecipesIds(data) {
  return {
    type: SET_SAVED_RECIPES_IDS,
    data
  };
}

export function setMenuRecipesIds(data) {
  return {
    type: SET_MENU_RECIPES_IDS,
    data
  };
}

export function setShoppingList(data) {
  return {
    type: SET_SHOPPING_LIST,
    data
  };
}

export function setShoppingListOpen(data) {
  return {
    type: SET_SHOPPING_LIST_OPEN,
    data
  };
}

export function setEmptyShoppingListOpen(data) {
  return {
    type: SET_EMPTY_SHOPPING_LIST_OPEN,
    data
  };
}

export function setDoneShoppingListOpen(data) {
  return {
    type: SET_DONE_SHOPPING_LIST_OPEN,
    data
  };
}

export function setShowDelete(data) {
  return {
    type: SET_SHOW_DELETE,
    data
  };
}

export function setUsername(data) {
  return {
    type: SET_USERNAME,
    data
  };
}

//-----------------------------------
//--Recipes
//-----------------------------------

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
      dispatch(getRecipeFromId(id));
    }
  };
}

export function getRecipeFromId(id) {
  return dispatch => {
    fetch(`${API_URL}api/recipe/${id}`)
      .then(responseChecker)
      .then(json => {
        if (json.error) {
          dispatch(
            setError({ title: "Getting Recipe Error", text: json.error })
          );
        } else {
          dispatch(setSingleRecipe(json[0]));
        }
      })
      .catch(error => {
        dispatch(getRequestFailure("error with api"));
      });
  };
}

export function getRecipes(pageNumber) {
  return dispatch => {
    dispatch(getRequest());

    fetch(`${API_URL}api/latest?rpp=9&pg=${pageNumber}`)
      .then(responseChecker)
      .then(json => {
        if (json.error) {
          dispatch(
            setError({ title: "Getting Recipe Error", text: json.error })
          );
        } else {
          dispatch(setRecipes(json));
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(getRequestFailure("error with api"));
      });
  };
}

//-----------------------------------
//--Search
//-----------------------------------

export function getRecipesSearch(searchUrl, page) {
  return dispatch => {
    dispatch(getRequest());

    fetch(`${API_URL}api/search${searchUrl}&rpp=12&pg=${page}`)
      .then(responseChecker)
      .then(json => {
        if (json.error) {
          dispatch(setError({ title: "Search Error", text: json.error }));
        } else {
          dispatch(setSearchRecipes(json));
        }
      })
      .catch(error => {
        dispatch(
          setSearchRecipes({
            rpp: "10",
            pg: "1",
            resultCount: 0,
            results: []
          })
        );
        console.log(error);
        dispatch(getRequestFailure("error with api"));
      });
  };
}

//-----------------------------------
//--Signup/Login
//-----------------------------------

export function getSignup(formdata) {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${API_URL}api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: formdata })
    })
      .then(responseChecker)
      .then(response => {
        if (response.error) {
          dispatch(setError({ title: "Signup Error", text: response.error }));
        } else {
          dispatch(getRequestSuccess());
          localStorage.setItem("loginToken", response.jwt);
          dispatch(setCookie(response.jwt));
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(getRequestFailure("error with api"));
      });
  };
}

export function getLogin(formdata) {
  return dispatch => {
    dispatch(getRequest());
    fetch(`${API_URL}api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ auth: formdata })
    })
      .then(responseChecker)
      .then(response => {
        if (response.error) {
          dispatch(setError({ title: "Login Error", text: response.error }));
        } else {
          dispatch(getRequestSuccess());
          localStorage.setItem("loginToken", response.jwt);
          dispatch(setCookie(response.jwt));
        }
      })
      .catch(e => {
        console.log(e);
        dispatch(
          setError({
            title: "Login Error",
            text: ["Email Or Password Incorrect"]
          })
        );
      });
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem("loginToken");
    dispatch(setCookie(""));
  };
}

//-----------------------------------
//--Saved
//-----------------------------------

export function getSavedRecipes(pageNumber) {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    if (!pageNumber) {
      pageNumber = 1;
    }
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/saved_recipes?rpp=12&pg=${pageNumber}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseChecker)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({ title: "Saved Recipe Error", text: response.error })
            );
          } else {
            if (!response.results.length && pageNumber > 1) {
              dispatch(getSavedRecipes(pageNumber - 1));
            } else {
              dispatch(setSavedRecipes(response));
              dispatch(getRequestSuccess());
            }
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
          dispatch(logout());
        });
    };
  }
}

export function getSavedRecipesIds() {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/saved_recipes?id_only=true`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseChecker)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({ title: "Saved Recipe Error", text: response.error })
            );
          } else {
            dispatch(setSavedRecipesIds(response.ids));
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
          dispatch(logout());
        });
    };
  }
}

export function addSavedRecipes(recipeid, list) {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      let newList = [...list, recipeid];
      dispatch(setSavedRecipesIds(newList));
      dispatch(getRequest());
      fetch(`${API_URL}api/saved_recipes/${recipeid}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseChecker)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({ title: "Adding Saved Error", text: response.error })
            );
          } else {
            dispatch(getRequestSuccess());
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
        });
    };
  }
}

export function deleteSavedRecipes(recipeid, recipeids) {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/saved_recipes/${recipeid}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseCheckerWithNoReturn)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({
                title: "Delete Save Recipe Error",
                text: response.error
              })
            );
          } else {
            const newArray = returnAsyncDeleteArray(recipeids, recipeid);
            dispatch(setSavedRecipesIds(newArray));
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
        });
    };
  }
}

//-----------------------------------
//--Make
//-----------------------------------

export function getMakeRecipes(pageNumber) {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    if (!pageNumber) {
      pageNumber = 1;
    }
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/make_recipes?rpp=12&pg=${pageNumber}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseChecker)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({ title: "Getting Recipes Error", text: response.error })
            );
          } else {
            if (!response.results.length && pageNumber > 1) {
              dispatch(getMakeRecipes(pageNumber - 1));
            } else {
              dispatch(setMenuRecipes(response));
              dispatch(getRequestSuccess());
            }
          }
        })
        .catch(e => {
          if (pageNumber > 1) {
            getMakeRecipes(pageNumber - 1);
          } else {
            console.log(e);
            dispatch(getRequestFailure("error with api"));
            dispatch(logout());
          }
        });
    };
  }
}

export function getMakeRecipesIds() {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/make_recipes?id_only=true`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseChecker)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({ title: "Error Getting Recipes", text: response.error })
            );
          } else {
            dispatch(setMenuRecipesIds(response.ids));
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
          dispatch(logout());
        });
    };
  }
}

export function addMakeRecipes(recipeid, list) {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      let newList = [...list, recipeid];
      dispatch(setMenuRecipesIds(newList));
      dispatch(getRequest());
      fetch(`${API_URL}api/make_recipes/${recipeid}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseChecker)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({
                title: "Adding Menu Recipe Error",
                text: response.error
              })
            );
          } else {
            dispatch(getRequestSuccess());
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
        });
    };
  }
}

export function deleteMakeRecipes(recipeid) {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/make_recipes/${recipeid}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseCheckerWithNoReturn)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({ title: "Deleting Recipe Error", text: response.error })
            );
          } else {
            dispatch(getMakeRecipesIds());
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
        });
    };
  }
}

//-----------------------------------
//--Shopping List
//-----------------------------------

export function getShoppingList() {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/shopping_list`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseChecker)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({ title: "Shopping List Error", text: response.error })
            );
          } else {
            dispatch(setShoppingList(response));
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
        });
    };
  }
}

export function updateShoppingList(id, contents) {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/items/${id}?check=${contents}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseChecker)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({
                title: "Updating Shopping List Error",
                text: response.error
              })
            );
          } else {
            dispatch(setShoppingList(response));
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
        });
    };
  }
}

export function addIngredient(formContent) {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/shopping_list`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formContent)
      })
        .then(responseChecker)
        .then(response => {
          if (response.error) {
            dispatch(
              setError({
                title: "Adding Ingredient Error",
                text: response.error
              })
            );
          } else {
            dispatch(setShoppingList(response));
          }
        })
        .catch(e => {
          dispatch(getRequestFailure("error with api"));
        });
    };
  }
}

export function deleteIngredient(id) {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"),
          "Content-Type": "application/json"
        }
      })
        .then(responseCheckerWithNoReturn)
        .then(response => {
          dispatch(getShoppingList());
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
        });
    };
  }
}

//-----------------------------------
//--Profile
//-----------------------------------

export function getProfile() {
  if (!localStorage.getItem("loginToken")) {
    return dispatch => {
      dispatch(getRequestFailure({ error: "Not Logged In" }));
    };
  } else {
    return dispatch => {
      dispatch(getRequest());
      fetch(`${API_URL}api/profile`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken")
        }
      })
        .then(responseChecker)
        .then(response => {
          dispatch(setUsername(response.username));
          dispatch(getRequestSuccess());
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure("error with api"));
        });
    };
  }
}
