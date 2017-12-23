require 'rails_helper'

describe 'User' do
  let(:user){ build(:user)}
  let(:saved_recipe){build(:saved_recipe, user: user)}
  describe 'validation' do
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
  describe '#saved_recipe_ids' do
    it 'responds to #saved_recipes' do
      expect(user).to respond_to(:saved_recipe_ids)
    end
    it 'returns an array' do
      saved_recipe
      expect(user.saved_recipe_ids).to be_a Array
    end

  end
end
