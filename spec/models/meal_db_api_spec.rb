require 'rails_helper'

URL = 'http://www.themealdb.com/api/json/v1/1'

describe MealDbApi do

  let(:api){ MealDbApi.new}

  describe '#fetch_latest_recipes' do
    context 'when api can be reached' do
      around :each do |code|
        VCR.use_cassette 'MealDbApi/fetch_latest_recipes' do
          code.run
        end
      end
      it 'responds to request' do
        expect(api).to respond_to(:fetch_latest_recipes)
      end
      it 'returns meals' do
        expect(api.fetch_latest_recipes).not_to be_empty
      end
    end
  end

  describe '#error' do
    it 'responds to error' do
      expect(api).to respond_to(:error)
    end
  end

  describe '#results' do
    around :each do |code|
      VCR.use_cassette 'MealDbApi/latest_recipes' do
        code.run
      end
    end
    it 'responds to results' do
      expect(api).to respond_to(:results)
    end
  end

  describe '#search_recipes' do
    around :each do |code|
      VCR.use_cassette 'MealDbApi/search_recipes' do
        code.run
      end
    end
    it 'responds to search_recipes' do
      expect(api).to respond_to(:search_recipes)
    end

  end
end
