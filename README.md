# 🛒 Recipe Shopping App 

Search for, save and turn recipes into shopping lists.

## Introduction
The Recipe Shopping App is a single-page web application that uses React/Redux on the front end, and Rails on the back end.

This repo contains code for just the Rails back end.

(Visit [https://github.com/chuckinabox/grocery-shopping-app](https://github.com/chuckinabox/grocery-shopping-app) for the front end React stuff.)

## Getting Started
How to get this server up and running on your machine.

### Pre-Requisites
- Rails 5 and PostgreSQL
- BigOven API key

### Installation

First, clone this repository.

```
git clone https://github.com/yxlau/grocery-shopping-app.git
```

Then, install them gems using

```
bundle install
```

Next, define your [BigOven Api key](http://api2.bigoven.com/) in `config/application.yml`. For example,

```rb
# config/application.yml
BIGOVEN_API_KEY: thesupersecretkeythatheygiveyou
```

*(We're using [Figaro](https://github.com/laserlemon/figaro) to keep our secrets safe)*

And finally, run the server!

```
rails s
``` 




