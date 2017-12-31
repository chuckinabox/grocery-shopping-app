require 'rails_helper'

describe 'Api/ItemRequests' do
  let(:user){ create(:user)}
  let(:other_user){ create(:user)}
  let(:items){ create_list(:item, 4, user: user)}
  let(:item_attributes){ {unit: 'tbsp', quantity: 0.25, check: true, name: 'Sugar'}}
  let(:item){ create(:item, user: user)}
  describe 'GET #index' do
    context 'when not authenticated' do
      it 'returns unauthorized' do
        get api_items_path
        expect(response).to have_http_status :unauthorized
      end
    end
    context 'when auth headers provided' do
      it 'returns ok' do
        get api_items_path, headers: auth(user)
        expect(response).to have_http_status :ok
      end
      it 'returns grocery items' do
        items
        get api_items_path, headers: auth(user)
        expect(json.count).to eq 4
      end
      it 'returns empty array if user has no items' do
        get api_items_path, headers: auth(user)
        expect(json).to be_a Array
      end
    end
  end

  describe 'POST #create' do
    context 'when not authenticated' do
      it 'returns unauthorized' do
        post api_items_path, params: item_attributes
        expect(response).to have_http_status :unauthorized
      end
    end
    context 'when authenticated' do
      it 'returns created' do
        post api_items_path, headers: auth(user), params: item_attributes
        expect(response).to have_http_status :created
      end
      it 'returns all items' do
        items
        post api_items_path, headers: auth(user), params: item_attributes
        expect(json.count).to eq 5
      end
    end
  end

  describe 'PUT #update' do
    context 'when not authenticated' do
      it 'returns unauthorized' do
        put api_item_path(item.id), params: item_attributes
        expect(response).to have_http_status :unauthorized
      end
    end
    context 'when authenticated' do
      before do
        put api_item_path(item.id), headers: auth(user), params: {name: 'New name'}
      end
      it 'returns ok' do
        expect(response).to have_http_status :ok
      end
      it 'updates the item' do
        item.reload
        expect(item.name).to eq 'New name'
      end
    end
    context 'when bad params provided' do
      before do
        put api_item_path(item.id), headers: auth(user), params: {quantity: "string"}
      end
      it 'returns unprocessable entity' do
        expect(response).to have_http_status :unprocessable_entity
      end
      it 'returns error' do
        expect(json["error"]).not_to be_nil
      end
    end
    context 'when item does not exist' do
      it 'returns not found' do
        item.update(user: other_user)
        put api_item_path(item.id), headers: auth(user), params: {name: 'blah'}
        expect(response).to have_http_status :not_found
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when not authenticated' do
      it 'returns unauthorized' do
        delete api_item_path(item.id)
        expect(response).to have_http_status :unauthorized
      end
    end
  end
  context 'when authenticated' do
    it 'returns ok for successful updates' do
      delete api_item_path(item), headers: auth(user)
    end
    it 'changes a user\'s item count' do
      item
      expect{ delete api_item_path(item), headers: auth(user)}.to change(Item, :count).by -1
    end
  end
  context 'when item not found' do
    it 'returns not_found ' do
      item.update(user: other_user)
      delete api_item_path(item.id), headers: auth(user)
      expect(response).to have_http_status :not_found
    end
  end
end
