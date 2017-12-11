require 'rails_helper'

describe 'Api/SearchRequests' do
  let(:api){ MealDbApi.new}
  describe 'GET #index' do
    context 'when params are missing' do
      it 'returns 403' do
        get api_search_index_path
        expect(response).to have_http_status(403)
      end
    end
    context 'when proper params provided' do
      around :each do |code|
        VCR.use_cassette 'api/search_requests/get_index' do
          code.run
        end
      end
      it 'returns ok' do
        get api_search_index_path, params: {q: 'Pea soup'}
        expect(response).to have_http_status :ok
      end
      it 'returns recipe' do
        get api_search_index_path, params: {q: 'Pea soup'}
        expect(JSON.parse(response.body)[0]['title']).to eq 'Split Pea Soup'
      end
    end
  end
end
