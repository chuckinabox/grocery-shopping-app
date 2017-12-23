class User < ApplicationRecord
  has_secure_password
  has_many :saved_recipes

  validates :email, uniqueness: true, presence: true, on: :create
  validates :password, length: {minimum: 8}, on: :create
  validates :username, presence: true, on: :create
  validates_confirmation_of :password, on: :create

  def saved_recipe_ids
    return self.saved_recipes.map{ |recipe| recipe.recipe_id} unless self.saved_recipes.blank?
  end
end
