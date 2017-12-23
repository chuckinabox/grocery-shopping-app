class Api::SavedRecipesController < ApplicationController
  before_action :authenticate_user, :set_user

  def create
    return head :bad_request unless params[:recipe_id]
    recipe_id = params[:recipe_id].to_i
    if @user.saved_recipe_ids
      if @user.saved_recipe_ids.map.include?(recipe_id)
        return render json: {error: 409, message: 'Recipe already saved'}, status: :conflict
      else
        @user.saved_recipe_ids << recipe_id
      end
    else
      SavedRecipe.create(user: current_user, recipe_ids: [recipe_id])
      @user.reload
    end
    render json: {ids: @user.saved_recipe_ids}, status: :created
  end



  private

  def set_user
    @user = current_user
  end

end
