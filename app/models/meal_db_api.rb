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
      clear_error
      parse_results
    else
      define_error(@response.code)
    end
  end

  def has_error?
    ! @error.empty?
  end

  def search_recipes(query)
    return define_error(403, "Missing search params") unless query
    handle_socket_error do
      @response = self.class.get("/search.php?s=#{query}")
    end
    return if has_error?
    if @response.success?
      clear_error
      parse_results
    else
      define_error(@response.code)
    end
  end

  private

  def clear_error
    @error = {}
  end

  def parse_results
    return if @response["meals"].length < 1
    @results = []
    meals = {}
    @response["meals"].each do |meal|
      meals["title"] = meal["strMeal"]
      meals["id"] = meal["idMeal"]
      meals["photo_url"] = meal["strMealThumb"]
      meals["instructions"] = meal["strInstructions"].gsub(/\r\n/, "")
      meals["ingredients"] = []
      meal.keys.each do |key|
        matched = key.match(/(strIngredient)(\d+)/)
        if matched && meal[key].length > 0
          meals["ingredients"] << (meal["strMeasure#{matched[2]}"] + " " + meal[key])
        end
      end
      @results << meals
      meals = {}
    end
    @results
  end

  def handle_socket_error(&block)
    begin
      block.call
    rescue SocketError
      @error =  { status: 500, message: "Could not connect to the server"}
    end
  end

  def define_error(code, message)
    @error[:status] = code
    @error[:message] = message
    return if code && message
    case code
    when 404
      @error[:message] = "Resource not found"
    when 500
      @error[:message] = "Could not connect to API"
    when 403
      @error[:message] = "Bad request"
    else
      @error[:message] = "We don't know what went wrong"
    end

  end
end
