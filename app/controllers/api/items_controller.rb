class Api::ItemsController < ApplicationController
  before_action :authenticate_user

  def index
    return render json: user_items
  end

  def create
    if current_user.items.create!(whitelisted_params)
      render json: user_items, status: :created
    end
  end

  def update
    item = Item.find_by!(id: params[:id], user: current_user)
    if item.update!(updatable_params)
      render json: user_items, status: :ok
    end
  end

  def destroy
    item = Item.find_by!(id: params[:id], user: current_user)
    if item.destroy!
      render json: user_items, status: :ok
    end
  end

  private

  def user_items
    items = Item.includes(:make_recipe).where(user: current_user)
    items.as_json(only: [:id, :name, :make_recipe_id, :quantity, :check, :unit], include: {make_recipe: {only: [:recipe_id]}})
  end

  def updatable_params
    params.permit(:name, :unit, :quantity, :check)
  end

  def whitelisted_params
    params.permit(:name, :unit, :quantity, :check, :make_recipe_id)
  end
end
