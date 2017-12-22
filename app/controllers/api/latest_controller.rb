class Api::LatestController < ApplicationController
  before_action :set_up
  def index
    @api.fetch_latest_recipes(whitelisted_params)
    if @api.has_error?
      render json: {error: @api.error}, status: @api.error[:status]
    else
      render json: @api.results
    end
  end

  private

  def whitelisted_params
    params.permit(:rpp, :pg, :format)
  end

  def set_up
    @api = BigOvenApi.new
  end

end
