require 'rails_helper'

describe 'Api/LatestRequests' do

  describe 'GET #index' do
    around :each do |code|
      VCR.use_cassette 'api/latest_requests/get_index' do
        code.run
      end
    end
    it 'returns ok' do
      get api_latest_index_path
      expect(response).to have_http_status(:ok)
    end
  end
end
