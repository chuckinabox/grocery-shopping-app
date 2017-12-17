require 'rails_helper'

describe 'Api/SearchRequests' do
  let(:api){ BigOvenApi.new}
  describe 'GET #index' do
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
      it 'returns recipes' do
        get api_search_index_path, params: {q: 'Pea soup'}
        expect(JSON.parse(response.body)['results'][0]['title']).to eq 'Pea Soup'
      end
      it 'includes metadata about the search' do
        get api_search_index_path, params: {q: 'Pea soup'}
        body = JSON.parse(response.body)
        expect(body['rpp']).not_to be_nil
        expect(body['pg']).not_to be_nil
        expect(body['resultCount']).not_to be_nil
      end
    end
    context 'when params are missing' do
      it 'returns 403' do
        get api_search_index_path
        expect(response).to have_http_status(403)
      end
    end
  end
end
