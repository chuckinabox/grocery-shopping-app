require 'rails_helper'

describe 'api/UserTokenRequests' do
  let(:user){ create(:user)}

  context 'logging in'
  it 'returns nothing if credentials invalid' do
    post api_login_path, params: {auth: {email: user.email, password: user.password}}
    expect(response).to have_http_status(:created)
  end

  it 'returns a token if credentials valid' do
    post api_login_path, params: {auth: {email: user.email, password: 'fake'}}
    expect(response).to have_http_status(:not_found)
  end


end
