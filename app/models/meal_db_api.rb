class MealDbApi
  attr_reader :error, :results
  include HTTParty
  base_uri 'http://www.themealdb.com/api/json/v1/1'

  def initialize
    @error = {}
  end

  def fetch_latest_recipes
    handle_socket_error do
      @response = self.class.get("/latest.php")
    end
    return if has_error?
    if @response.success?
      @error = {}
      parse_results
    else
      @error = { code: @response.code}
    end
  end

  def has_error?
    ! @error.empty?
  end

  private

  def parse_results
    return if @response["meals"].length < 1
    @results = []
    meals = {}
    @response["meals"].each do |meal|
      meals["title"] = meal["strMeal"]
      meals["id"] = meal["idMeal"]
      meals["photo_url"] = meal["strMealThumb"]
      meals["instructions"] = meal["strInstructions"]
      meals["ingredients"] = []
      meal.keys.each do |key|
        matched = key.match(/(strIngredient)(\d+)/)
        if matched && meal[key].length > 0
          meals["ingredients"] << (meal["strMeasure#{matched[2]}"] + " " + meal[key])
        end
      end
      @results << meals
    end
    @results
  end

  def handle_socket_error(&block)
    begin
      block.call
    rescue SocketError
      @error =  { code: 404, message: "Could not connect to the server"}
    end
  end

end
