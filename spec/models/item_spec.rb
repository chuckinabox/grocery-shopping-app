require 'rails_helper'

describe 'Item' do
  let(:item){ build(:item)}
  describe 'validations' do
    it 'is invalid without a name' do
      item.name = nil
      expect(item).not_to be_valid
    end
    it 'is invalid if quantity is not a number' do
      item.quantity = "blah"
      expect(item).not_to be_valid
      expect(item.errors["quantity"]).not_to be_nil
    end
    it 'is valid if quantity is a number' do
      item.quantity = "1"
      expect(item).to be_valid
    end
  end
end
