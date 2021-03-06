require 'rails_helper'

describe 'Api/SavedRecipesRequests' do
  let(:user){ create(:user)}
  let(:recipe){create(:saved_recipe, recipe_id: 1, user: user)}
  let(:recipes){ create_list(:saved_recipe, 5, user: user)}
  describe 'POST #create' do
    context 'when user is not authenticated' do
      it 'returns unauthorized' do
        post api_saved_recipe_path(1)
        expect(response).to have_http_status :unauthorized
      end
    end

    context 'when user is authenticated' do
      it 'successful save returns :created' do
        post api_saved_recipe_path(9999),  headers: auth(user)
        expect(response).to have_http_status :created
      end
      it 'creates a saved recipe record' do
        expect{post api_saved_recipe_path(9999), headers: auth(user)}.to change(SavedRecipe, :count).by 1
      end
    end
    context 'when recipe is already saved' do
      it 'returns :unprocessable_entity' do
        recipe
        post api_saved_recipe_path(1), headers: auth(user)
        expect(response).to have_http_status :unprocessable_entity
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when user is not authenticated' do
      it 'returns unauthorized' do
        delete api_saved_recipe_path(recipe.recipe_id)
        expect(response).to have_http_status :unauthorized
      end
    end
    context 'when user is authenticated' do
      before do
        recipe
      end
      it 'returns ok' do
        delete api_saved_recipe_path(recipe.recipe_id), headers: auth(user)
        expect(response).to have_http_status :ok
      end
      it 'deletes the record' do
        expect{ delete api_saved_recipe_path(recipe.recipe_id), headers: auth(user) }.to change(SavedRecipe, :count).by -1
      end
    end
  end

  describe 'GET #index' do
    context 'when user is not authenticated' do
      it 'returns unauthorized' do
        get api_saved_recipes_path
        expect(response).to have_http_status :unauthorized
      end
    end
    context 'when user is authenticated' do
      around :each do |code|
        VCR.use_cassette 'api/saved_recipes_requests/get_index' do
          code.run
        end
      end
      it 'returns ok' do
        get api_saved_recipes_path, headers: auth(user)
        expect(response).to have_http_status :ok
      end
      it 'returns the saved recipes' do
        recipes
        get api_saved_recipes_path, headers: auth(user)
        expect(json['results']).not_to be_nil
      end
    end
  end
end
