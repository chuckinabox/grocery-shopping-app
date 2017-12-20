import * as Actions from "./actions";

// const initailState = {
//   isFetching: false,
//   shouldSearch: true,
//   errors: null,
//   cookie: "",
//   recipes: [
//     {
//       title: "",
//       id: "",
//       photo_url: "",
//       ingredients: [],
//       instructions: ""
//     }
//   ],
//   searchRecipes: {"rpp": "10",
// "pg": "1",
// "resultCount": 0,
// "results": []
// },
//   singleRecipe: {
//     title: "",
//     id: "",
//     photo_url: "",
//     ingredients: [],
//     instructions: ""
//   }
// };

const demoData = {
  isFetching: false,
  shouldSearch: true,
  errors: null,
  cookie: "",
  recipes: [
    {
      id: 1800991,
      title: "Broccoli Cheddar Chicken and Dumpling Soup",
      description:
        "This cheesy, creamy soup is the definition of comfort food. Seconds are inevitable so make a double batch!",
      rating: 5,
      photoURL:
        "http://redirect.bigoven.com/pics/rs/640/broccoli-cheddar-chicken-and-dumpling-soup-1800991.jpg",
      webURL:
        "http://www.bigoven.com/recipe/broccoli-cheddar-chicken-and-dumpling-soup/1800991",
      instructions:
        "Instructions are at http://www.halfbakedharvest.com/broccoli-cheddar-chicken-and-dumpling-soup/",
      reviewCount: 2,
      category: "Main Dish",
      prepTime: 60,
      sourceURL:
        "http://www.halfbakedharvest.com/broccoli-cheddar-chicken-and-dumpling-soup/",
      ingredients: [
        "2.0 tablespoons of olive oil",
        "2.0 tablespoons of butter",
        "0.75 pound of boneless skinless chicken breasts or thighs",
        "1.0  of kosher salt + pepper",
        "1.0  of yellow onion ",
        "4.0  of carrots",
        "4.0  of fresh thyme sprigs",
        "6.0 cups of low sodium chicken broth",
        "0.5 cup of apple cider",
        "4.0 cups of fresh or frozen broccoli florets",
        "0.5 cup of whole milk",
        "0.25 teaspoon of nutmeg",
        "2.0 cups of all-purpose flour",
        "1.0 tablespoon of baking powder",
        "1.5 cups of butter milk",
        "0.25 cup of grated parmesan cheese",
        "3.0 cups of shredded sharp cheddar cheese"
      ]
    },
    {
      id: 2059145,
      title: "Keto Chicken Cordon Bleu",
      description: "",
      rating: 4,
      photoURL:
        "http://redirect.bigoven.com/pics/rs/640/keto-chicken-cordon-bleu-2059145.jpg",
      webURL: "http://www.bigoven.com/recipe/keto-chicken-cordon-bleu/2059145",
      instructions:
        "Instructions are at https://www.ketovale.com/recipe/keto-chicken-cordon-bleu/",
      reviewCount: 1,
      category: null,
      prepTime: null,
      sourceURL: "https://www.ketovale.com/recipe/keto-chicken-cordon-bleu/",
      ingredients: [
        "1.0  of pcs chicken breast (boneless and skinless )",
        "1.0 clove of garlic (minced)",
        "3.0 slices of bacon",
        "1.0 slice of cheddar cheese",
        "1.0 slice of smoked ham",
        "1.0  of Lettuce (optional)",
        "1.0  of lemon (optional)",
        "1.0  of Salt and Pepper (to taste)"
      ]
    },
    {
      id: 163808,
      title: "Honey Brined Turkey",
      description:
        "Incredibly moist and flavorful. Use the juices to make Giblet Cream Gravy",
      rating: 4.875,
      photoURL:
        "http://redirect.bigoven.com/pics/rs/640/honey-brined-turkey-2.jpg",
      webURL: "http://www.bigoven.com/recipe/honey-brined-turkey/163808",
      instructions:
        "Line extra-large stockpot with heavy large plastic bag (about 30-gallon capacity). Rinse turkey; place in plastic bag. Stir 8 quarts water, 2 cups coarse salt and 1 cup honey in large pot until salt and honey dissolve. Add 1 bunch fresh thyme, peeled garlic cloves and black pepper. Pour brine over turkey. Gather plastic bag tightly around turkey so that bird is covered with brine; seal plastic bag. Refrigerate pot with turkey in brine at least 12 hours and up to 18 hours. Position rack in bottom third of oven and preheat to 350F. Drain turkey well; discard brine. Pat turkey dry inside and out. Squeeze juice from lemon halves into main cavity. Add lemon rinds and remaining 1 bunch fresh thyme to main cavity. Tuck wings under turkey; tie legs together loosely to hold shape. Place turkey on rack set in large roasting pan. Rub turkey all over with 2 tablespoons olive oil. Roast turkey 1 hour. Baste turkey with 1 cup chicken broth. Continue to roast until turkey is deep brown and thermometer inserted into thickest part of thigh registers 180F, basting with 1 cup chicken broth every 30 minutes and covering loosely with foil if turkey is browning too quickly, about 2 1/2 hours longer. Transfer turkey to platter. Tent turkey loosely with foil and let stand 30 minutes. Pour pan juices into large glass measuring cup. Spoon off fat; reserve juices.",
      reviewCount: 8,
      category: "Main Dish",
      prepTime: 1440,
      sourceURL: null,
      ingredients: [
        "1.0 12-14 Lb of Turkey",
        "8.0 quarts of Water",
        "2.0 cup of Coarse salt",
        "1.0 cup of Honey",
        "2.0 bunch of Fresh thyme",
        "8.0 cloves of Garlic",
        "2.0 tablespoons of Black Pepper",
        "2.0  of Lemons",
        "2.0 tablespoons of olive oil",
        "5.0 cups of Chicken broth (low sodium)"
      ]
    },
    {
      id: 2083728,
      title: "Beefy Taco Mac and Cheese",
      description: "",
      rating: 5,
      photoURL:
        "https://photos.bigoven.com/recipe/hero/beefy-taco-mac-and-cheese-a34007-3e47a9a90cc1043fc8bbf575.jpg",
      webURL: "http://www.bigoven.com/recipe/beefy-taco-mac-and-cheese/2083728",
      instructions:
        "Instructions are at https://ramshacklepantry.com/beefy-taco-mac-cheese/",
      reviewCount: 1,
      category: null,
      prepTime: null,
      sourceURL: "https://ramshacklepantry.com/beefy-taco-mac-cheese/",
      ingredients: [
        "1.0 pound of hamburger",
        "1.0  of taco seasoning",
        "2.0 cups of dry macaroni",
        "4.0 tablespoons of salted butter",
        "2.0 cups of whole milk",
        "0.25 cup of all-purpose flour",
        "2.0 cups of sharp or extra sharp cheddar cheese",
        "0.5 cup of crushed nacho chips"
      ]
    },
    {
      id: 71544,
      title: "Cold Zucchini Soup with Curry",
      description: "",
      rating: 4.6,
      photoURL:
        "http://redirect.bigoven.com/pics/rs/640/cold-zucchini-soup-with-curry.jpg",
      webURL:
        "http://www.bigoven.com/recipe/cold-zucchini-soup-with-curry/71544",
      instructions:
        'Rinse the zucchini and pat dry. Trim off the ends and cut about a cupful of  zucchini into thin match sticks. Place in a saucepan, cover with cold water  and boil 3 to 4 minutes. Drain and set aside. Meanwhile cut the remaining  zucchini into small chunks and put in a kettle. Add the onion, peeled and  thinly sliced. Sprinkle with curry powder and stir to coat the pieces. Add  the chicken broth and bring to a boil, cover, and simmer about 15 minutes  or until zucchini is very tender. Whirl in a blender or food processor or  put through a food mill. There should be about 4 cups. Add the cream, milk,  salt and pepper to taste. Add the reserved zucchini stickls. Chill  thoroughly. Serve sprinkled with chopped chives. Serves 6 to 8.    (Recipe is from HICKORY HILL ZUCCHINIS by Barbara Cooley McNamee.) Posted  to KitMailbox Digest  by "Joanne L. Schweikj" <SCHWEIKJ@fredonia.edu> on  Jul 23, 1997',
      reviewCount: 5,
      category: "Soups, Stews and Chili",
      prepTime: 45,
      sourceURL: null,
      ingredients: [
        "0.5 c of Milk (can be skim)",
        "1.0  of Finely chopped chives for",
        "1.5 lb of Zucchini",
        "3.0 c of Chicken broth",
        "1.5 ts of Curry powder",
        "1.0  of Salt",
        "1.0 lg of Onion",
        "1.0 c of Heavy cream (or evaporated"
      ]
    }
  ],
  singleRecipe: {
    title: "Venetian Duck Ragu",
    id: "100",
    photo_url:
      "http://www.themealdb.com/images/media/meals/qvrwpt1511181864.jpg",
    ingredients: [
      "1 tbls Olive Oil",
      "4 Duck Legs",
      "2 finely chopped Onions",
      "2 cloves minced Garlic",
      "2 tsp ground Cinnamon",
      "2 tsp Plain Flour",
      "250ml Red Wine",
      "800g Chopped Tomatoes",
      "1 Chicken Stock Cube",
      "3 sprigs Rosemary",
      "2 Bay Leaves",
      "1 tsp Sugar",
      "2 tbs Milk",
      "600g Paccheri Pasta",
      "Grated Parmesan Cheese"
    ],

    instructions:
      "Heat the oil in a large pan. Add the duck legs and brown on all sides for about 10 mins. Remove to a plate and set aside. Add the onions to the pan and cook for 5 mins until softened. Add the garlic and cook for a further 1 min, then stir in the cinnamon and flour and cook for a further min. Return the duck to the pan, add the wine, tomatoes, stock, herbs, sugar and seasoning. Bring to a simmer, then lower the heat, cover with a lid and cook for 2 hrs, stirring every now and then. Carefully lift the duck legs out of the sauce and place on a plate – they will be very tender so try not to lose any of the meat. Pull off and discard the fat, then shred the meat with 2 forks and discard the bones. Add the meat back to the sauce with the milk and simmer, uncovered, for a further 10-15 mins while you cook the pasta. Cook the pasta following pack instructions, then drain, reserving a cup of the pasta water, and add the pasta to the ragu. Stir to coat all the pasta in the sauce and cook for 1 min more, adding a splash of cooking liquid if it looks dry. Serve with grated Parmesan, if you like. "
  },
  searchRecipes: {
    rpp: "5",
    pg: "1",
    resultCount: 686,
    results: [
      {
        id: 174616,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 5,
        webURL: "https://www.bigoven.com/recipe/pea-soup/174616",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 2073337,
        title: "Pea soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/2073337",
        photoURL:
          "https://photos.bigoven.com/recipe/hero/pea-soup-e31dd4647cd01cf5dfd7adbc.jpg"
      },
      {
        id: 1904117,
        title: "Pea Soup",
        category: "",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/1904117",
        photoURL: "https://photos.bigoven.com/recipe/hero/pea-soup-1904117.jpg"
      },
      {
        id: 1367231,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/1367231",
        photoURL: "https://photos.bigoven.com/recipe/hero/pea-soup-1367231.jpg"
      },
      {
        id: 615113,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 4,
        webURL: "https://www.bigoven.com/recipe/pea-soup/615113",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 301793,
        title: "Pea soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/301793",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 155424,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/155424",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 121678,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/121678",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 196292,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/196292",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 738454,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/738454",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 121679,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/121679",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 155427,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/155427",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 1564058,
        title: "Pea Soup ",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/1564058",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 1702653,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/1702653",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 823896,
        title: "Pea Soup",
        category: "Main Dish",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/823896",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 121680,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/121680",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 483040,
        title: "Pea soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/483040",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 318700,
        title: "Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/318700",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 1358608,
        title: "Pea soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/pea-soup/1358608",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 177531,
        title: "Split Pea Soup (Snert) Dutch Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 5,
        webURL:
          "https://www.bigoven.com/recipe/split-pea-soup-snert-dutch-pea-soup/177531",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 1611,
        title: "Canadian Pea Soup -- Whole Yellow Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL:
          "https://www.bigoven.com/recipe/canadian-pea-soup-whole-yellow-pea-soup/1611",
        photoURL: "https://photos.bigoven.com/recipe/hero/recipe-no-image.jpg"
      },
      {
        id: 178707,
        title: "Vegetarian Split Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 4,
        webURL:
          "https://www.bigoven.com/recipe/vegetarian-split-pea-soup/178707",
        photoURL:
          "https://photos.bigoven.com/recipe/hero/vegetarian-split-pea-soup-2.jpg"
      },
      {
        id: 187547,
        title: "Split Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 0,
        webURL: "https://www.bigoven.com/recipe/split-pea-soup/187547",
        photoURL: "https://photos.bigoven.com/recipe/hero/split-pea-soup.jpg"
      },
      {
        id: 234263,
        title: "Black-Eyed Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 5,
        webURL: "https://www.bigoven.com/recipe/black-eyed-pea-soup/234263",
        photoURL:
          "https://photos.bigoven.com/recipe/hero/black-eyed-pea-soup.jpg"
      },
      {
        id: 76033,
        title: "Crockpot Split Pea Soup",
        category: "Soups, Stews and Chili",
        StarRating: 5,
        webURL: "https://www.bigoven.com/recipe/crockpot-split-pea-soup/76033",
        photoURL:
          "https://photos.bigoven.com/recipe/hero/crockpot-split-pea-soup.jpg"
      }
    ]
  }
};

export function recipesList(state = demoData, action) {
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
    default:
      return state;
  }
}
