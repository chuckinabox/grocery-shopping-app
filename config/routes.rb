Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  defaults format: :json do
    namespace :api do
      post 'user_token' => 'user_token#create'
      post 'login' => 'user_token#create'
      post 'signup' => 'users#create'
      resources :latest, only: [:index]
      resources :search, only: [:index]
      resources :recipe, only:[:show]
      resources :saved_recipes, only: [:destroy]
      post 'saved_recipes/:id', to: 'saved_recipes#create'
      resources :make_recipes, only: [:destroy]
      post 'make_recipes/:id', to: 'make_recipes#create'
    end
  end
end
