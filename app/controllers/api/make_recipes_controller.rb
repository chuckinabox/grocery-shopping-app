class Api::MakeRecipesController < ApplicationController

  before_action :authenticate_user, :set_user

  def create
    recipe_id = params[:id] ? params[:id].to_i : nil
    @make_recipe = MakeRecipe.new(user: @user, recipe_id: recipe_id)
    if @make_recipe.save!
      @user.reload
      render json: {ids: @user.make_recipes.ids}, status: :created
    end
  end

  def destroy
    return head :bad_request unless params[:id]
    @make_recipe = current_user.make_recipes.where(recipe_id: params[:id])
    return head :not_found unless @make_recipe.present?
    if @make_recipe.first.destroy!
      return head :ok
    end
  end


  private

  def set_user
    @user = current_user
  end

end
