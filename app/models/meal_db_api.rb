class MealDbApi
	include HTTParty
	base_uri 'http://www.themealdb.com/api/json/v1/1'

	def latest_recipes
	 @response = self.class.get("/latest.php")
	end

	def find_recipe(query)
	end

	def results
		return if @response["meals"].length < 1
		meals = []
		results = {}
		@response["meals"].each do |meal|
			results["title"] = meal["strMeal"]
			results["id"] = meal["idMeal"]
			results["photo_url"] = meal["strMealThumb"]
			results["instructions"] = meal["strInstructions"]
			results["ingredients"] = []
			meal.keys.each do |key|
				matched = key.match(/(strIngredient)(\d+)/)
				if matched && meal[key].length > 0
					results["ingredients"] << (meal["strMeasure#{matched[2]}"] + " " + meal[key])
				end
			end
			meals << results
		end
		meals
	end

end

