class Api::RandomController < ApplicationController
	before_action :set_up
	def index
		@api.latest_recipes
		render json: @api.results
	end

	private

	def set_up
		@api = MealDbApi.new
	end

end

