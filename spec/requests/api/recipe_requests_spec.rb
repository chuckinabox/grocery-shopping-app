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
        expect(JSON.parse(response.body)[0]["title"]).to eq("Pea Soup")
      end
    end
  end
end
