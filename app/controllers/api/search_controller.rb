class Api::SearchController < ApplicationController
  before_action :set_up
  def index
    @api.search_recipes(whitelisted_search_params)
    if @api.has_error?
      render json: {error: @api.error}, status: @api.error[:status]
    else
      render json: @api.results
    end
  end

  private

  def whitelisted_search_params
    params.permit(:q, :format)[:q]
  end

  def set_up
    @api = BigOvenApi.new
  end
end
