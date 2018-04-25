* # 🛒 Recipe Shopping App

Search for, save and turn recipes into shopping lists.

## Introduction

The Recipe Shopping App is a single-page web application that uses React/Redux on the front end, and Rails on the back end.

(Visit [https://github.com/yxlau/grocery-shopping-app](https://github.com/yxlau/grocery-shopping-app) for the back end Rails stuff.)

## Getting Started

How to get the React page up and running on your machine.

### Live Demo

_http://www.RecipeShoppingApp.com_

### Pre-Requisites

* npm
* node.js

### Installation

First, clone this repository.

```
git clone https://github.com/chuckinabox/grocery-shopping-app.git
```

Change to `react-client` folder

```
cd react-client/
```

Then, install the necessary packages

```
npm install
```

#### In Development

* Change package.json 's `proxy:"http://localhost:3000/"` to server address

#### In Production

* Add your api's url to API_URL at the beginning of './react-client/src/actions.js' and './react-client/src/components/ShoppingListSingle.js'

And finally, run a server to serve the React!

```
npm start
```
