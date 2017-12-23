class Api::SavedRecipesController < ApplicationController
  before_action :authenticate_user, :set_user

  def create
    recipe_id = params[:id] ? params[:id].to_i : nil
    @saved_recipe = SavedRecipe.new(user: @user, recipe_id: recipe_id)
    if @saved_recipe.save!
      @user.reload
      render json: {ids: @user.saved_recipes.ids}, status: :created
    end
  end

  def destroy
    return head :bad_request unless params[:id]
    @saved_recipe = current_user.saved_recipes.where(recipe_id: params[:id])
    return head :not_found unless @saved_recipe.present?
    if @saved_recipe.first.destroy!
      return head :ok
    end
  end


  private

  def set_user
    @user = current_user
  end

end
