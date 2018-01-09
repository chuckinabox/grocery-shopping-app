//API REQUESTS/Fetches
export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE";
export const SET_SHOULD_SEARCH = "SET_SHOULD_SEARCH";
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
    errors
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
    fetch(`api/recipe/${id}`)
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

export function getRecipes(pageNumber) {
  return dispatch => {
    dispatch(getRequest());

    fetch(`api/latest?rpp=12&pg=${pageNumber}`)
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

//-----------------------------------
//--Search
//-----------------------------------

export function getRecipesSearch(searchUrl, page) {
  return dispatch => {
    dispatch(getRequest());

    fetch(`api/search${searchUrl}&rpp=12&pg=${page}`)
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

//-----------------------------------
//--Signup/Login
//-----------------------------------

export function getSignup(formdata) {
  return dispatch => {
    dispatch(getRequest());
    fetch("api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: formdata })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }
        return response.json();
      })
      .then(response => {
        dispatch(getRequestSuccess());
        localStorage.setItem("loginToken", response.jwt);
        dispatch(setCookie(response.jwt));
      })
      .catch(e => {
        console.log(e);
        dispatch(getRequestFailure({ error: e }));
      });
  };
}

export function getLogin(formdata) {
  return dispatch => {
    dispatch(getRequest());
    fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ auth: formdata })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error with api");
        }
        return response.json();
      })
      .then(response => {
        dispatch(getRequestSuccess());
        localStorage.setItem("loginToken", response.jwt);
        dispatch(setCookie(response.jwt));
      })
      .catch(e => {
        console.log(e);
        dispatch(getRequestFailure({ error: e }));
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
      fetch(`api/saved_recipes?rpp=12&pg=${pageNumber}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response.json();
        })
        .then(response => {
          if (!response.results.length && pageNumber > 1) {
            dispatch(getSavedRecipes(pageNumber - 1));
          } else {
            dispatch(setSavedRecipes(response));
            dispatch(getRequestSuccess());
          }
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
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
      fetch("api/saved_recipes?id_only=true", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response.json();
        })
        .then(response => {
          dispatch(setSavedRecipesIds(response.ids));
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
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
      fetch(`api/saved_recipes/${recipeid}`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.error);
          }
          return response.json();
        })
        .then(response => {
          dispatch(getRequestSuccess());
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
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
      fetch(`api/saved_recipes/${recipeid}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response;
        })
        .then(response => {
          const newArray = returnAsyncDeleteArray(recipeids, recipeid);
          dispatch(setSavedRecipesIds(newArray));
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
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
      fetch(`api/make_recipes?rpp=12&pg=${pageNumber}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response.json();
        })
        .then(response => {
          if (!response.results.length && pageNumber > 1) {
            dispatch(getMakeRecipes(pageNumber - 1));
          } else {
            dispatch(setMenuRecipes(response));
            dispatch(getRequestSuccess());
          }
        })
        .catch(e => {
          if (pageNumber > 1) {
            getMakeRecipes(pageNumber - 1);
          } else {
            console.log(e);
            dispatch(getRequestFailure({ error: e }));
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
      fetch("api/make_recipes?id_only=true", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response.json();
        })
        .then(response => {
          dispatch(setMenuRecipesIds(response.ids));
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
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
      fetch(`api/make_recipes/${recipeid}`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response.json();
        })
        .then(response => {
          dispatch(getRequestSuccess());
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
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
      fetch(`api/make_recipes/${recipeid}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response;
        })
        .then(response => {
          dispatch(getMakeRecipesIds());
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
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
      fetch(`api/shopping_list`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response.json();
        })
        .then(response => {
          dispatch(setShoppingList(response));
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
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
      fetch(`api/items/${id}?check=${contents}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response.json();
        })
        .then(response => {
          dispatch(setShoppingList(response));
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
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
      fetch(`api/profile`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("loginToken")
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Error with api");
          }
          return response.json();
        })
        .then(response => {
          dispatch(getRequestSuccess());
          console.log("Profile Get", response);
        })
        .catch(e => {
          console.log(e);
          dispatch(getRequestFailure({ error: e }));
        });
    };
  }
}
