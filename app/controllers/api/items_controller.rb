class Api::ItemsController < ApplicationController
  before_action :authenticate_user

  def index
    return render json: current_user.items.as_json(only: [:name, :make_recipe_id, :quantity, :check, :units])
  end
end
