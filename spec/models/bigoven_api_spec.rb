require 'rails_helper'

describe BigOvenApi do
  let(:api){ BigOvenApi.new}
  let(:api_factory){ build(:big_oven_api, :with_error)}

  describe '#error' do
    it 'returns an @error object' do
      expect(api.error.class).to eq Hash
    end
  end

  describe '#fetch_latest_recipes' do
    context 'when api response is successful' do
      around :each do |code|
        VCR.use_cassette 'BigOvenApi/fetch_latest_recipes' do
          code.run
        end
      end
      it 'returns 5 recipes' do
        api.fetch_latest_recipes
        expect(api.results.count).to eq 5
      end
      it 'recipes should have the required keys' do
        keys = %w(id title description rating photoURL webURL instructions reviewCount category prepTime sourceURL ingredients)
        api.fetch_latest_recipes
        expect(api.results.first.keys.sort).to eq keys.sort
      end
    end
    context 'when source api response is unsuccessful' do
      around :each do |code|
        VCR.use_cassette 'BigOvenApi/fetch_latest_recipes_fail' do code.run
        end
      end
      it 'returns an error' do
        api.fetch_latest_recipes
        expect(api.has_error?).to eq true
      end
      it 'returns error details' do
        api.fetch_latest_recipes
        expect(api.error).not_to be_empty
      end
    end
  end

  describe '#search_recipes' do
    it 'responds to #search_recipes' do
      expect(api).to respond_to(:search_recipes)
    end
  end


  describe '#has_error?' do
    it 'returns false if error is empty' do
      expect(api.has_error?).to eq false
    end
    it 'returns' do
      api.instance_variable_set(:@error, {code: 400})
      expect(api.has_error?).to eq true
    end
  end


end
