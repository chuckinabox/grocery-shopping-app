import * as Actions from "./actions";

const initailState = {
  isFetching: false,
  shouldSearch: true,
  errors: null,
  cookie: "",
  recipes: [
    {
      title: "",
      id: "",
      photo_url: "",
      ingredients: [],
      instructions: ""
    }
  ],
  searchRecipes: {
    rpp: "10",
    pg: "1",
    resultCount: 0,
    results: []
  },
  savedRecipes: {
    rpp: "10",
    pg: "1",
    resultCount: 0,
    results: []
  },
  menuRecipes: {
    rpp: "10",
    pg: "1",
    resultCount: 0,
    results: []
  },
  savedRecipesIds: [],
  menuRecipesIds: [],
  singleRecipe: {
    title: "",
    id: "",
    photo_url: "",
    ingredients: [],
    instructions: ""
  }
};

export function recipesList(state = initailState, action) {
  // console.log("Redux--", action);
  switch (action.type) {
    case Actions.SET_SINGLE_RECIPE:
      return {
        ...state,
        singleRecipe: action.data
      };
    case Actions.SET_RECIPES:
      return {
        ...state,
        isFetching: false,
        recipes: action.data
      };
    case Actions.SET_SEARCH_RECIPES:
      return {
        ...state,
        isFetching: false,
        searchRecipes: action.data
      };
    case Actions.SET_SAVED_RECIPES:
      return {
        ...state,
        isFetching: false,
        savedRecipes: action.data
      };
    case Actions.SET_MENU_RECIPES:
      return {
        ...state,
        isFetching: false,
        menuRecipes: action.data
      };
    case Actions.GET_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case Actions.GET_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case Actions.GET_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors
      };
    case Actions.SET_COOKIE:
      return {
        ...state,

        cookie: action.data
      };
    case Actions.SET_SHOULD_SEARCH:
      return {
        ...state,
        shouldSearch: action.data
      };
    case Actions.SET_SAVED_RECIPES_IDS:
      return {
        ...state,
        isFetching: false,
        savedRecipesIds: action.data
      };
    case Actions.SET_MENU_RECIPES_IDS:
      return {
        ...state,
        isFetching: false,
        menuRecipesIds: action.data
      };
    default:
      return state;
  }
}
