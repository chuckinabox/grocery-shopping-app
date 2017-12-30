class Api::MakeRecipesController < ApplicationController

  before_action :authenticate_user
  before_action :set_api, only: [:create]

  def create
    recipe_id = params[:id] ? params[:id].to_i : nil
    @api.fetch_recipe_by_id(recipe_id)
    return render json: {error: @api.error}, status: @api.error[:status] if @api.has_error?
    @make_recipe = MakeRecipe.new(user: current_user, recipe_id: recipe_id, items_attributes: get_items)
    if @make_recipe.save
      current_user.reload
      render json: {ids: current_user.make_recipes.ids}, status: :created
    else
      render json: {error: @make_recipe.errors.full_messages, status: 422}, status: :unprocessable_entity
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
      set_query
      ids = filter_ids
      @api.fetch_recipes_by_id(ids, @query)
      if @api.has_error?
        return render json: {error: @api.error}, status: @api.error[:status]
      else
        render json: {resultCount: @make_recipe_ids.count,rpp: @query[:rpp], pg: @query[:pg],  results: @api.results}, status: :ok
      end
    end
  end


  private



  def get_items
    @api.results[0]['ingredientList'].map do |ingredient|
      {user: current_user, quantity: ingredient[:quantity], name: ingredient[:name], check: false, units: ingredient[:unit]}
    end
  end

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

end
