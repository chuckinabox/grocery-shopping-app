class Api::LatestController < ApplicationController
  before_action :set_up
  def index
    @api.fetch_latest_recipes
    if @api.has_error?
      render json: @api.error[:code], status: @api.error[:message]
    else
      render json: @api.results
    end
  end

  private

  def set_up
    @api = MealDbApi.new
  end

end
