require 'rails_helper'

describe 'Api/UserRequests' do
  let(:user){ create(:user)}
  let(:valid_user){ build(:user)}

  describe 'POST #create' do
    context 'when invalid params sent' do
      it 'no params returns unprocessable_entity'do
        post api_signup_path
        expect(response).to have_http_status :unprocessable_entity
      end
      it 'missing param returns unprocessable_entity' do
        post api_signup_path, params: {user: {email: valid_user.email}}
        expect(response).to have_http_status :unprocessable_entity
      end
      it 'returns an error message' do
        post api_signup_path, params: {user: {email: valid_user.email}}
        expect(json["error"]).not_to be_nil
      end
    end
    context 'when email is taken' do
      it 'return :unprocessable_entity' do

      end
    end
    context 'when valid params sent' do
      before do
        post api_signup_path, params: {user: { email: valid_user.email, password: valid_user.password, password_confirmation: valid_user.password_confirmation, username: valid_user.username}}
      end
      it 'returns :created' do
        expect(response).to have_http_status :created
      end
      it 'returns the user token' do
        expect(response.body["jwt"]).not_to be_nil
      end
    end
  end

  describe 'GET #show' do
    context 'when not authenticated' do
      it 'returns unauthorized' do
        get api_profile_path
        expect(response).to have_http_status :unauthorized
      end
    end
    context 'when authenticated' do
      before do
        get api_profile_path, headers: auth(user)
      end
      it 'returns ok' do
        expect(response).to have_http_status :ok
      end
      it 'returns the user\'s id and username' do
        expect(json['id']).to eq user.id
        expect(json['username']).to eq user.username
      end
    end
  end

end
