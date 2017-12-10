require 'rails_helper'

describe MealDbApi do

	let(:api){ MealDbApi.new}
	let(:latest_recipes){MealDbApi.new.latest_recipes}

  describe '#latest_recipes' do 
  	around :each do |code|
  		VCR.use_cassette 'MealDbApi/latest_recipes' do 
  			code.run
  		end
  	end
  	it 'responds to request' do 
  		response = latest_recipes
  		expect(response.ok?).to be true
  end
  it 'returns meals' do 
  		response = latest_recipes
  		json = JSON.parse(response.body)
  		expect(json['meals'][0]['strMeal']).not_to be_nil
  end

  end

  describe '#results' do 
  	around :each do |code|
  		VCR.use_cassette 'MealDbApi/latest_recipes' do 
  			code.run
  		end
  	end
  	it 'responds to results' do 
  		latest_recipes
  		expect(api).to respond_to(:results)
  	end
  end
end