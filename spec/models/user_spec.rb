require 'rails_helper'

describe 'User' do
  let(:user){ build(:user)}
  describe 'creation' do
    it 'is invalid without a username' do
      user.username = nil
      expect(user).to be_invalid
    end
    it 'is invalid without a password' do
      user.password = nil
      expect(user).to be_invalid
    end
    it 'is invalid when password length is less than 8' do
      user.password = 'x'
      expect(user).to be_invalid
    end
    it 'is invalid without an email' do
      user.email = nil
      expect(user).to be_invalid
    end
    it 'is invalid when email exists' do
      user1 = create(:user)
      user.email = user1.email
      expect(user).to be_invalid
    end
    it 'is invalid when passwords do not match' do
      user.password_confirmation = 'x'
      expect(user).to be_invalid
    end
    it 'is valid with username, password and email' do
      expect(build(:user)).to be_valid
    end
  end
end
