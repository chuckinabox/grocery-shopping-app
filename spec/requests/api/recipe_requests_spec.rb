require 'rails_helper'

describe 'Api/RecipeRequests' do
  let(:api){ BigOvenApi.new}

  describe 'GET #show' do
    context 'when id provided' do
      around :each do |code|
        VCR.use_cassette 'api/recipe_requests/get_show' do
          code.run
        end
      end
      it 'returns ok' do
        get api_recipe_path(174616)
        expect(response).to have_http_status :ok
      end
      it 'returns the recipe' do
        get api_recipe_path(174616)
        expect(json[0]["title"]).to eq("Pea Soup")
      end
    end
    context 'when id missing' do
      around :each do |code|
        VCR.use_cassette 'api/recipe_requests/get_show_missing_id' do
          code.run
        end
      end
      it 'returns bad request' do
        get api_recipe_path
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
end
