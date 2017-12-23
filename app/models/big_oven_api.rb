class BigOvenApi
  include Typhoeus
  attr_reader :error, :results

  URL = 'https://api2.bigoven.com'
  API_KEY = Rails.application.secrets.bigoven_api_key
  HEADERS = {"headers": { "X-BigOven-API-Key" => API_KEY}}

  def initialize
    @error = {}
    @response = []
    @hydra = Typhoeus::Hydra.hydra
  end

  def fetch_recipe_by_id(id)
    make_single_request("#{URL}/recipe/#{id}")
    return if has_error?
    parse_recipes(JSON.parse(@request.response.body))
  end

  def search_recipes(query)
    return define_error(403, "Missing search params") unless query[:q]
    setup_results(query)
    make_single_request("#{URL}/recipes?title_kw=#{URI.encode(query["q"])}&rpp=#{@results[:rpp]}&pg=#{@results[:pg]}")
    return if has_error?

    parse_search_results(JSON.parse(@request.response.body))
  end

  def fetch_latest_recipes(query=nil)
    query ||= {rpp: 10, pg: 1}
    setup_results(query)
    recipe_ids = get_recipe_ids
    return if has_error?

    bulk_request = request_recipes_by_id(recipe_ids)
    @hydra.run

    responses = make_bulk_request(bulk_request)
    return if has_error?
    parse_recipes(responses)
  end

  def has_error?
    ! @error.empty?
  end

  private

  def setup_results(query)
    @results = {rpp: query[:rpp],
                pg: query[:pg] }
  end

  def parse_search_results(search_results)
    @results[:resultCount] = search_results["ResultCount"]
    @results[:results] = []
    return if search_results["ResultCount"] == 0
    search_results["Results"].each do |r|
      recipe = {}
      recipe["id"] = r["RecipeID"]
      recipe["title"] = r["Title"]
      recipe["category"] = r["Category"]
      recipe["StarRating"] = r["StarRating"]
      recipe["webURL"] = r["WebURL"]
      recipe["photoURL"] = r["PhotoUrl"]
      recipe["reviewCount"] = r["ReviewCount"]
      recipe["servings"] = r["Servings"]
      @results[:results] << recipe
    end
  end

  def make_bulk_request(requests)
    requests.map do |request|
      unless request.response.success?
        set_error(response)
        break
      end
      @error = {}
      JSON.parse(request.response.body)
    end
  end

  def request_recipes_by_id(ids)
    ids.map do |id|
      request = Typhoeus::Request.new("#{URL}/recipe/#{id}", HEADERS)
      @hydra.queue(request)
      request
    end
  end

  def create_full_recipe_hash(recipe)
    dish = {}
    dish["id"] = recipe["RecipeID"]
    dish["title"] = recipe["Title"]
    dish["description"] = recipe["Description"]
    dish["rating"] = recipe["StarRating"]
    dish["photoURL"] = recipe["ImageURL"]
    dish["webURL"] = recipe["WebURL"]
    dish["instructions"] = recipe["Instructions"].gsub(/\r\n/, "")
    dish["reviewCount"] = recipe["ReviewCount"]
    dish["category"] = recipe["Category"]
    dish["prepTime"] = recipe["TotalMinutes"]
    dish["sourceURL"] = recipe["BookmarkURL"]
    dish["ingredients"] = recipe["Ingredients"].map do |ingredient|
      "#{ingredient['Quantity']} #{ingredient['Unit']} of #{ingredient['Name']}"
    end
    dish
  end

  def make_single_request(url)
    @request = Typhoeus::Request.new("#{url}", HEADERS)
    handle_errors
    @request.run
  end

  def parse_recipes(recipes)
    @results = []
    return if recipes.empty?
    recipes = [recipes] if recipes.class == Hash
    recipes.each do |recipe|
      @results << create_full_recipe_hash(recipe)
    end
  end

  def get_recipe_ids
    make_single_request("#{URL}/recipes/raves?&rpp=#{@results[:rpp]}&pg=#{@results[:pg]}")
    return if has_error?
    JSON.parse(@response.body).map{ |recipe| recipe["RecipeInfo"]["RecipeID"]}
  end

  def handle_errors
    @request.on_complete do |response|
      if response.success?
        @error = {}
        @response = response
      else
        set_error(response)
      end
    end
  end

  def set_error(response)
    @error[:status] = response.code
    if response.timed_out?
      @error[:message] = "Timed out"
    elsif response.code == 0
      @error[:message] = response.return_message
    else
      @error[:message] = "HTTP request failed: " + response.code.to_s
    end
  end

  def define_error(status, message)
    @error[:status] = status
    @error[:message] = message
  end

end
