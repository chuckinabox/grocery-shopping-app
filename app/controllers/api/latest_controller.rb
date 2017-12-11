class Api::LatestController < ApplicationController
	before_action :set_up
	def index
		@response = @api.latest_recipes
		# if  @response.errors? 
		# else 
		# end
		render json: @results
	end

	private

	def set_up
		@api = MealDbApi.new
	end

end

