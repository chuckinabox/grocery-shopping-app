require 'rails_helper'

describe 'Api/ItemRequests' do
  describe 'GET #index' do
    context 'when not authenticated' do
      it 'returns unauthorized' do
        get api_items_path
        expect(response).to have_http_status :unauthorized
      end
    end
    context 'when auth headers provided' do
      it 'returns ok' do
        get api_items_path
        expect(response).to have_http_status :ok
      end
      it 'returns grocery items'
    end
  end
end
