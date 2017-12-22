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
      before do
        get api_search_index_path, params: {q: 'Pea soup'}
      end
      it 'returns ok' do
        expect(response).to have_http_status :ok
      end
      it 'returns recipes' do
        expect(json['results'][0]['title']).to eq 'Pea Soup'
      end
      it 'returns 10 results by default' do
        expect(json["results"].count).to eq 10
      end
    end
    context 'when rpp is specified' do
      around :each do |code|
        VCR.use_cassette 'api/search_requests/get_index_rpp' do
          code.run
        end
      end
      it 'returns 3 results when rpp is 3' do
        get api_search_index_path, params: {q: 'Butter Chicken', rpp: 3}
        expect(json["results"].count).to eq 3
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
