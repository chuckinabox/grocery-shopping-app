import * as Actions from "./actions";

// const initailState = {
//  isFetching: false,
//  error: null,
//  recipes: [{
//    title: "",
//    photo_url: "",
//    ingredients: [],
//    instructions: ""
// }],
// singleRecipe: {
//    title: "",
//    photo_url: "",
//    ingredients: [],
//    instructions: ""
// }
// }

const demoData = {
  isFetching: false,
  error: null,
  recipes: [
    {
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
    {
      title: "Stovetop Eggplant With Harissa, Chickpeas, and Cumin Yogurt",
      id: "101",
      photo_url:
        "http://www.themealdb.com/images/media/meals/yqwtvu1487426027.jpg",
      ingredients: [
        "4 tablespoons Olive Oil",
        "6 small Egg Plants",
        "½ tablespoon Harissa",
        "1 can Chickpeas",
        "2 cups halved Cherry Tomatoes",
        "1 1/2 cups Greek yogurt",
        "1 tablespoon Ground cumin",
        "½ cup Parsley"
      ],
      instructions:
        "Heat the oil in a 12-inch skillet over high heat until shimmering. Add the eggplants and lower the heat to medium. Season with salt and pepper as you rotate the eggplants, browning them on all sides. Continue to cook, turning regularly, until a fork inserted into the eggplant meets no resistance (you may have to stand them up on their fat end to finish cooking the thickest parts), about 20 minutes, lowering the heat and sprinkling water into the pan as necessary if the eggplants threaten to burn or smoke excessively. Mix the harissa, chickpeas and tomatoes together, then add to the eggplants. Cook until the tomatoes have blistered and broken down, about 5 minutes more. Season with salt and pepper and add water as necessary to thin to a saucy consistency. Meanwhile, combine the yogurt and cumin in a serving bowl. Season with salt and pepper. Top the eggplant mixture with the parsley, drizzle with more extra virgin olive oil, and serve with the yogurt on the side. "
    },
    {
      title: "Nutty Chicken Curry",
      id: "102",
      photo_url:
        "http://www.themealdb.com/images/media/meals/yxsurp1511304301.jpg",
      ingredients: [
        "1 large Red Chilli",
        "0.5 Ginger",
        "1 large Garlic",
        "Bunch Coriander",
        "1 tbsp Sunflower Oil",
        "4 Chicken Breasts",
        "5 tblsp Peanut Butter",
        "150ml Chicken Stock",
        "200g Greek Yogurt"
      ],
      instructions:
        "Finely slice a quarter of the chilli, then put the rest in a food processor with the ginger, garlic, coriander stalks and one-third of the leaves. Whizz to a rough paste with a splash of water if needed. Heat the oil in a frying pan, then quickly brown the chicken chunks for 1 min. Stir in the paste for another min, then add the peanut butter, stock and yogurt. When the sauce is gently bubbling, cook for 10 mins until the chicken is just cooked through and sauce thickened. Stir in most of the remaining coriander, then scatter the rest on top with the chilli, if using. Eat with rice or mashed sweet potato. "
    },
    {
      title: "Beef Sunday Roast",
      id: "103",
      photo_url:
        "http://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg",
      ingredients: [
        "8 slices Beef",
        "12 florets Broccoli",
        "1 Packet Potatoes",
        "1 Packet Carrots",
        "140g plain flour",
        "4 Eggs",
        "200ml milk",
        "drizzle (for cooking) sunflower oil"
      ],
      instructions:
        "Cook the Broccoli and Carrots in a pan of boiling water until tender. Roast the Beef and Potatoes in the oven for 45mins, the potatoes may need to be checked regularly to not overcook. To make the Yorkshire puddings: Heat oven to 230C/fan 210C/gas 8. Drizzle a little sunflower oil evenly into 2 x 4-hole Yorkshire pudding tins or a 12-hole non-stick muffin tin and place in the oven to heat through To make the batter, tip 140g plain flour into a bowl and beat in four eggs until smooth. Gradually add 200ml milk and carry on beating until the mix is completely lump-free. Season with salt and pepper. Pour the batter into a jug, then remove the hot tins from the oven. Carefully and evenly pour the batter into the holes. Place the tins back in the oven and leave undisturbed for 20-25 mins until the puddings have puffed up and browned. Serve immediately. Plate up and add the Gravy as desired. "
    },
    {
      title: "Fennel Dauphinoise",
      id: "104",
      photo_url:
        "http://www.themealdb.com/images/media/meals/ytttsv1511798734.jpg",
      ingredients: [
        "225g Potatoes",
        "1 small Fennel",
        "1 clove finely chopped Garlic",
        "75 ml Milk",
        "100ml Double Cream",
        "For Greasing Butter",
        "to serve Parmesan Cheese"
      ],
      instructions:
        "Heat oven to 180C/160C fan/gas. Put potatoes, fennel, and garlic in a medium non-stick pan. Pour in milk and double cream, season well and simmer gently, covered, for 10 mins, stirring halfway through, until potatoes are just tender. Divide the mixture between 2 small (about 150ml) buttered ramekins and scatter with Parmesan. Bake for 40 mins until the potatoes are golden and tender when pierced with a knife. Snip the reserved fennel fronds over before serving. "
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
    default:
      return state;
  }
}
