class SpoonacularAPI
	include HTTParty
	base_uri 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com'
    KEY = ENV['SPOONACULAR_API_KEY']


	def self.get_random_recipes
		self.get("/random?limitLicense=false&number=5", headers: {'X-Mashape-Key': KEY})
	end
end