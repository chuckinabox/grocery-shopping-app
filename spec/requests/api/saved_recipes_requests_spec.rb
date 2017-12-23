require 'rails_helper'

describe 'Api/SavedRecipesRequests' do
  let(:user){ create(:user)}
  let(:recipe){create(:saved_recipe, user: user)}
  describe 'POST #create' do
    context 'when user is not authenticated' do
      it 'returns unauthorized' do
        post api_saved_recipes_path
        expect(response).to have_http_status :unauthorized
      end
    end

    context 'when user is authenticated' do
      it 'successful save returns :created' do
        post api_saved_recipes_path, params: {recipe_id: 9999},  headers: auth(user)
        expect(response).to have_http_status :created
      end
    end
    context 'when recipe_id is missing' do
      it 'returns :bad_request' do
        post api_saved_recipes_path, headers: auth(user)
        expect(response).to have_http_status :bad_request
      end
    end
    context 'when recipe is already saved' do
      it 'returns :conflict' do
        recipe
        user.saved_recipe_ids = [1]
        post api_saved_recipes_path, headers: auth(user), params: {recipe_id: 1}
        expect(response).to have_http_status :conflict
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
      it 'returns the saved recipes' do
        get api_saved_recipes_path, headers: auth(user)
        expect(response).to have_http_status :ok
      end
    end
  end
