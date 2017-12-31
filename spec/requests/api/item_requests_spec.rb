require 'rails_helper'

describe 'Api/ItemRequests' do
  let(:user){ create(:user)}
  let(:items){ create_list(:item, 4, user: user)}
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
end
