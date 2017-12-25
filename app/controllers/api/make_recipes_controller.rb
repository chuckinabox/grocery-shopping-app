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

  def index
    @make_recipe_ids = current_user.make_recipe_ids
    set_api
    if @make_recipe_ids.empty?
      return render json: {results: []}, status: :ok
    else
      # set_query
      ids = filter_ids
      @api.fetch_recipes_by_id(ids, @query)
      if @api.has_error?
        return render json: {error: @api.error}, status: @api.error[:status]
      else
        render json: {rpp: @query[:rpp], pg: @query[:pg],  results: @api.results}, status: :ok
      end
    end
  end


  private

  def set_api
    @api = BigOvenApi.new
  end

  def set_query
    @query = {
      rpp: params[:rpp] ? params[:rpp].to_i : 5,
      pg: params[:pg] ? params[:pg].to_i : 1
    }
  end

  def filter_ids
    i = @query[:rpp]*(@query[:pg]-1)
    @make_recipe_ids[i...@query[:rpp]+i]
  end


  def set_user
    @user = current_user
  end

end
