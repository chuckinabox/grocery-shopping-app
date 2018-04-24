class Api::RecipeController < ApplicationController
  before_action :set_up
  def show
    @api.fetch_recipe_by_id(params[:id])
    if @api.has_error?
      render json: {error: @api.error}, status: @api.error[:status]
    else
      render json: @api.results
    end
  end
  private

  def set_up
    @api = BigOvenApi.new
  end

end
