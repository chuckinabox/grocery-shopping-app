import * as Actions from "./actions";

// const initailState = {
//   isFetching: false,
//   errors: null,
//   cookie: "",
//   recipes: [
//     {
//       title: "",
//       photo_url: "",
//       ingredients: [],
//       instructions: ""
//     }
//   ],
//   singleRecipe: {
//     title: "",
//     photo_url: "",
//     ingredients: [],
//     instructions: ""
//   }
// };

const demoData = {
  isFetching: false,
  errors: null,
  cookie: "",
  recipes: [
    {
      title: "Saltfish and Ackee",
      id: "52936",
      photo_url:
        "http://www.themealdb.com/images/media/meals/vytypy1511883765.jpg",
      instructions:
        "For the saltfish, soak the salt cod overnight, changing the water a couple of times.Drain, then put the cod in a large pan of fresh water and bring to the boil. Drain again, add fresh water and bring to the boil again.Simmer for about five minutes, or until cooked through, then drain and flake the fish into large pieces. Discard any skin or bones.For the dumplings, mix the flour and suet with a pinch of salt and 250ml/9fl oz water to make a dough.Wrap the mixture in clingfilm and leave in the fridge to rest.Open the can of ackee, drain and rinse, then set aside.Heat a tablespoon of olive oil in a pan and fry the onion until softened but not brown.Add the spices, seasoning, pepper sauce and sliced peppers and continue to fry until the peppers are tender.Add the chopped tomatoes, then the salt cod and mix together. Lastly stir in the ackee very gently and leave to simmer until ready to serve.When you\u2019re almost ready to eat, heat about 1cm/\u00bdin vegetable oil in a frying pan and heat until just smoking.Shape the dumpling mix into plum-size balls and shallow-fry until golden-brown. (CAUTION: hot oil can be dangerous. Do not leave the pan unattended.)Drain the dumplings on kitchen paper and serve with the saltfish and ackee.",
      ingredients: [
        "450g Salt Cod",
        "400g Ackee",
        "1 chopped Onion",
        "1 tsp  Paprika",
        "2 tsp Curry Powder",
        "2 tsp Jerusalem Artichokes",
        "1 tsp  Hotsauce",
        "1 sliced Red Pepper",
        "1 sliced Yellow Pepper",
        "200g Tomatoes",
        "to taste Salt",
        "to taste Pepper",
        "250g Self-raising Flour",
        "30g Suet",
        "pinch Salt",
        "for frying Olive Oil"
      ]
    },
    {
      title: "Steak Diane",
      id: "52935",
      photo_url:
        "http://www.themealdb.com/images/media/meals/vussxq1511882648.jpg",
      instructions:
        'Heat oil in a 12" skillet over medium-high heat. Season steaks with salt and pepper, and add to skillet; cook, turning once, until browned on both sides and cooked to desired doneness, about 4 to 5 minutes for medium-rare. Transfer steaks to a plate, and set aside.Return skillet to high heat, and add stock; cook until reduced until to 1\u20442 cup, about 10 minutes. Pour into a bowl, and set aside. Return skillet to heat, and add butter; add garlic and shallots, and cook, stirring, until soft, about 2 minutes. Add mushrooms, and cook, stirring, until they release any liquid and it evaporates and mushrooms begin to brown, about 2 minutes. Add cognac, and light with a match to flamb\u00e9e; cook until flame dies down. Stir in reserved stock, cream, Dijon, Worcestershire, and hot sauce, and then return steaks to skillet; cook, turning in sauce, until warmed through and sauce is thickened, about 4 minutes. Transfer steak to serving plates and stir parsley and chives into sauce; pour sauce over steaks to serve.',
      ingredients: [
        "2 tbs Canola Oil",
        "4 Beef Fillet",
        "1 1/2 cup  Beef Stock",
        "2 tbs Butter",
        "2 cloves minced Garlic",
        "1 medium finely diced Challots",
        "4 oz  Mushrooms",
        "\u00bc cup Brandy",
        "\u00bc cup Heavy Cream",
        "1 tbs Dijon Mustard",
        "1 tbs Worcestershire Sauce",
        "Dash Tabasco Sauce",
        "1 tbs minced Parsley",
        "1 tbs minced Chives",
        "to taste Salt",
        "to taste Pepper"
      ]
    },
    {
      title: "Chicken Basquaise",
      id: "52934",
      photo_url:
        "http://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg",
      instructions:
        "Preheat the oven to 180\u00b0C/Gas mark 4. Have the chicken joints ready to cook. Heat the butter and 3 tbsp olive oil in a flameproof casserole or large frying pan. Brown the chicken pieces in batches on both sides, seasoning them with salt and pepper as you go. Don't crowd the pan - fry the chicken in small batches, removing the pieces to kitchen paper as they are done.Add a little more olive oil to the casserole and fry the onions over a medium heat for 10 minutes, stirring frequently, until softened but not browned. Add the rest of the oil, then the peppers and cook for another 5 minutes.Add the chorizo, sun-dried tomatoes and garlic and cook for 2-3 minutes. Add the rice, stirring to ensure it is well coated in the oil. Stir in the tomato paste, paprika, bay leaves and chopped thyme. Pour in the stock and wine. When the liquid starts to bubble, turn the heat down to a gentle simmer. Press the rice down into the liquid if it isn't already submerged and place the chicken on top. Add the lemon wedges and olives around the chicken.Cover and cook in the oven for 50 minutes. The rice should be cooked but still have some bite, and the chicken should have juices that run clear when pierced in the thickest part with a knife. If not, cook for another 5 minutes and check again.",
      ingredients: [
        "1.5kg Chicken",
        "25g Butter",
        "6 tblsp Olive Oil",
        "2 sliced Red Onions",
        "3 Large Red Pepper",
        "130g Chorizo",
        "8 Sun-Dried Tomatoes",
        "6 cloves sliced Garlic",
        "300g Basmati Rice",
        "drizzle Tomato Puree",
        "\u00bd tsp Paprika",
        "4 Bay Leaves",
        "Handful Thyme",
        "350ml Chicken Stock",
        "180g Dry White Wine",
        "2 Lemons",
        "100g  Black Olives",
        "to serve Salt",
        "to serve Pepper"
      ]
    },
    {
      title: "Rappie Pie",
      id: "52933",
      photo_url:
        "http://www.themealdb.com/images/media/meals/ruwpww1511817242.jpg",
      instructions:
        "Preheat oven to 400 degrees F (200 degrees C). Grease a 10x14x2-inch baking pan.Heat margarine in a skillet over medium heat; stir in onion. Cook and stir until onion has softened and turned translucent, about 5 minutes. Reduce heat to low and continue to cook and stir until onion is very tender and dark brown, about 40 minutes more.Bring chicken broth to a boil in a large pot; stir in chicken breasts, reduce heat, and simmer until chicken is no longer pink at the center, about 20 minutes. Remove from heat. Remove chicken breasts to a plate using a slotted spoon; reserve broth.Juice potatoes with an electric juicer; place dry potato flesh into a bowl and discard juice. Stir salt and pepper into potatoes; stir in enough reserved broth to make the mixture the consistency of oatmeal. Set remaining broth aside.Spread half of potato mixture evenly into the prepared pan. Lay cooked chicken breast evenly over potatoes; scatter caramelized onion evenly over chicken. Spread remaining potato mixture over onions and chicken to cover.Bake in the preheated oven until golden brown, about 1 hour. Reheat chicken broth; pour over individual servings as desired.",
      ingredients: [
        "2 tbs Butter",
        "2 chopped Onions",
        "4 qt  Chicken Stock",
        "1.5kg Chicken Breast",
        "4kg Potatoes",
        "2 tbs Salt",
        "1tbsp Black Pepper"
      ]
    },
    {
      title: "Pouding chomeur",
      id: "52932",
      photo_url:
        "http://www.themealdb.com/images/media/meals/yqqqwu1511816912.jpg",
      instructions:
        "In a large bowl, with an electric mixer, mix the butter and sugar till the mix is light.Add eggs and vanilla and mix.In another bowl, mix flour and baking powder.Alternate flour mix and milk to the butter mix.Pour into a 13 inch by 9 inch greased pan.MAPLE SAUCE.In a large casserole, bring to boil the syrup, brown sugar, cream and butter and constantly stir.Reduce heat and and gently cook 2 minutes or till sauce has reduced a little bit.Pour sauce gently over cake.Bake at 325\u00b0f (160\u00b0c) about 35 minutes or till cake is light brown and when toothpick inserted comes out clean.",
      ingredients: [
        "\u00bd cup  Butter",
        "1 cup  Sugar",
        "2 Eggs",
        "1 tsp  Vanilla Extract",
        "2 cups  Flour",
        "1 tsp  Baking Powder",
        "1 1/4 cup Milk",
        "1 1/2 cup  Maple Syrup",
        "1 1/2 cup  Brown Sugar",
        "1 1/2 cup  Single Cream",
        "1/3 cup Butter"
      ]
    },
    {
      title: "Sugar Pie",
      id: "52931",
      photo_url:
        "http://www.themealdb.com/images/media/meals/yrstur1511816601.jpg",
      instructions:
        "Preheat oven to 350 degrees F (175 degrees C). Grease a 9-inch pie dish.Place the brown sugar and butter in a mixing bowl, and beat them together with an electric mixer until creamy and very well combined, without lumps. Beat in eggs, one at a time, incorporating the first egg before adding the next one. Add the vanilla extract and salt; beat the flour in, a little at a time, and then the milk, making a creamy batter. Pour the batter into the prepared pie dish.Bake in the preheated oven for 35 minutes; remove pie, and cover the rim with aluminum foil to prevent burning. Return to oven, and bake until the middle sets and the top forms a crusty layer, about 15 more minutes. Let the pie cool to room temperature, then refrigerate for at least 1 hour before serving.",
      ingredients: [
        "2 cups  Brown Sugar",
        "\u00bc cup Butter",
        "2 Eggs",
        "1 tsp  Vanilla Extract",
        "1 tsp  Salt",
        "\u00bd cup  Plain Flour",
        "1 1/2 cups  Milk"
      ]
    },
    {
      title: "Pate Chinois",
      id: "52930",
      photo_url:
        "http://www.themealdb.com/images/media/meals/yyrrxr1511816289.jpg",
      instructions:
        "In a large pot of salted water, cook the potatoes until they are very tender. Drain.With a masher, coarsely crush the potatoes with at least 30 ml (2 tablespoons) of butter. With an electric mixer, pur\u00e9e with the milk. Season with salt and pepper. Set aside.With the rack in the middle position, preheat the oven to 190 \u00b0C (375 \u00b0F).In a large skillet, brown the onion in the remaining butter. Add the meat and cook until golden brown. Season with salt and pepper. Remove from the heat.Lightly press the meat at the bottom of a 20-cm (8-inch) square baking dish. Cover with the corn and the mashed potatoes. Sprinkle with paprika and parsley.Bake for about 30 minutes. Finish cooking under the broiler. Let cool for 10 minutes.",
      ingredients: [
        "4 cups  Potatoes",
        "60ml Butter",
        "\u00bd cup  Milk",
        "450g Minced Beef",
        "1 finely chopped  Onion",
        "500ml Creamed Corn",
        "to taste Paprika",
        "to taste Parsley",
        "Dash Salt",
        "Dash Pepper"
      ]
    },
    {
      title: "Timbits",
      id: "52929",
      photo_url:
        "http://www.themealdb.com/images/media/meals/txsupu1511815755.jpg",
      instructions:
        "Sift together dry ingredients.Mix together wet ingredients and incorporate into dry. Stir until smooth.Drop by teaspoonfuls(no bigger) into hot oil (365 degrees, no hotter), turning after a few moments until golden brown on all sides.Remove and drain.Roll in cinnamon sugar while still warm and serve.",
      ingredients: [
        "2 cups  Flour",
        "1/3 cup Sugar",
        "3 tsp Baking Powder",
        "\u00bd tsp Salt",
        "1 beaten Egg",
        "\u00be cup Milk",
        "3 tbs Oil",
        "for frying Oil",
        "garnish Icing Sugar"
      ]
    },
    {
      title: "BeaverTails",
      id: "52928",
      photo_url:
        "http://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
      instructions:
        "In the bowl of a stand mixer, add warm water, a big pinch of sugar and yeast. Allow to sit until frothy.Into the same bowl, add 1/2 cup sugar, warm milk, melted butter, eggs and salt, and whisk until combined.Place a dough hook on the mixer, add the flour with the machine on, until a smooth but slightly sticky dough forms.Place dough in a bowl, cover with plastic wrap, and allow to proof for 1 1/2 hours.Cut dough into 12 pieces, and roll out into long oval-like shapes about 1/4 inch thick that resemble a beaver\u2019s tail.In a large, deep pot, heat oil to 350 degrees. Gently place beavertail dough into hot oil and cook for 30 to 45 seconds on each side until golden brown.Drain on paper towels, and garnish as desired. Toss in cinnamon sugar, in white sugar with a squeeze of lemon, or with a generous slathering of Nutella and a handful of toasted almonds. Enjoy!",
      ingredients: [
        "1/2 cup  Water",
        "2 parts  Yeast",
        "1/2 cup  Sugar",
        "1/2 cup  Milk",
        "6 tblsp Butter",
        "2 Eggs",
        "1 \u00bd tsp Salt",
        "2-1/2 cups Flour",
        "for frying Oil",
        "garnish Lemon",
        "garnish Sugar",
        "garnish Cinnamon"
      ]
    },
    {
      title: "Montreal Smoked Meat",
      id: "52927",
      photo_url:
        "http://www.themealdb.com/images/media/meals/uttupv1511815050.jpg",
      instructions:
        "To make the cure, in a small bowl mix together salt, pink salt, black pepper, coriander, sugar, bay leaf, and cloves. Coat entire brisket with the cure and place in an extra-large resealable plastic bag. Place in the coldest part of the refrigerator and cure for 4 days, flipping brisket twice a day.Remove brisket from bag and wash as much cure off as possible under cold running water. Place brisket in a large container and fill with water and let soak for 2 hours, replacing water every 30 minutes. Remove from water and pat dry with paper towels.To make the rub, mix together black pepper, coriander, paprika, garlic powder, onion powder, dill weed, mustard, celery seed, and crushed red papper in a small bowl. Coat entire brisket with the rub.Fire up smoker or grill to 225 degrees, adding chunks of smoking wood chunks when at temperature. When wood is ignited and producing smoke, place brisket in, fat side up, and smoke until an instant read thermometer registers 165 degrees when inserted into thickest part of the brisket, about 6 hours.Transfer brisket to large roasting pan with V-rack. Place roasting pan over two burners on stovetop and fill with 1-inch of water. Bring water to a boil over high heat, reduce heat to medium, cover roasting pan with aluminum foil, and steam brisket until an instant read thermometer registers 180 degrees when inserted into thickest part of the meat, 1 to 2 hours, adding more hot water as needed.Transfer brisket to cutting board and let cool slightly. Slice and serve, preferably on rye with mustard.",
      ingredients: [
        "1 Beef Brisket",
        "3 tbs Salt",
        "3 tbs Black Pepper",
        "1 tbs Coriander",
        "1 tbs Sugar",
        "1 tsp  Bay Leaf",
        "1 tsp  Cloves",
        "3 tbs Black Pepper",
        "1 tbs Coriander",
        "1 tbs Paprika",
        "1 tbs Garlic",
        "1 tbs Onion",
        "1 tbs Dill",
        "1 tsp  English Mustard",
        "1 tbs Celery Salt",
        "1 tsp  Red Pepper Flakes"
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
  }
};

export function recipesList(state = demoData, action) {
  console.log("Redux--", action);
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
        isFetching: false,
        cookie: action.data
      };
    default:
      return state;
  }
}
