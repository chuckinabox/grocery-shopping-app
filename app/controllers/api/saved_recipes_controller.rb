class Api::SavedRecipesController < ApplicationController
  before_action :authenticate_user

  def create
    @saved_recipe = SavedRecipe.new(user: current_user, recipe_id: params[:id])
    if @saved_recipe.save!
      current_user.reload
      render json: {ids: current_user.saved_recipe_ids}, status: :created
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

  def index
    @saved_recipe_ids = current_user.saved_recipe_ids
    return render json: {ids: @saved_recipe_ids}, status: :ok if params[:id_only] == "true"
    set_api
    if @saved_recipe_ids.empty?
      return render json: {resultCount: @saved_recipe_ids.count, results: []}, status: :ok
    else
      set_query
      ids = filter_ids
      @api.fetch_recipes_by_id(ids, @query)
      if @api.has_error?
        return render json: {error: @api.error}, status: @api.error[:status]
      else
        render json: {resultCount: @saved_recipe_ids.count, rpp: @query[:rpp], pg: @query[:pg],  results: @api.results}, status: :ok
      end
    end
  end


  private

  def set_query
    @query = {
      rpp: params[:rpp] ? params[:rpp].to_i : 5,
      pg: params[:pg] ? params[:pg].to_i : 1
    }
  end

  def filter_ids
    i = @query[:rpp]*(@query[:pg]-1)
    @saved_recipe_ids[i...@query[:rpp]+i]
  end

  def set_api
    @api = BigOvenApi.new
  end


end
