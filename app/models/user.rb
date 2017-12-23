class User < ApplicationRecord
  has_secure_password
  has_one :saved_recipe

  validates :email, uniqueness: true, presence: true, on: :create
  validates :password, length: {minimum: 8}, on: :create
  validates :username, presence: true, on: :create
  validates_confirmation_of :password, on: :create

  def saved_recipe_ids
    return self.saved_recipe.recipe_ids if self.saved_recipe
  end

  def saved_recipe_ids=(ids)
    if self.saved_recipe
      return self.saved_recipe.recipe_ids = ids
    end
  end
end
