class User < ApplicationRecord
  has_secure_password
  has_many :saved_recipes, dependent: :destroy
  has_many :make_recipes, dependent: :destroy
  has_many :items, dependent: :destroy

  validates :email, uniqueness: true, presence: true, on: :create
  validates :password, length: {minimum: 8}, on: :create
  validates :username, presence: true, on: :create
  validates_confirmation_of :password, on: :create

  def saved_recipe_ids
    saved = self.saved_recipes.order('created_at DESC')
    return [] if saved.empty?
    self.saved_recipes.map{ |r| r.recipe_id}
  end

  def make_recipe_ids
    make = self.make_recipes
    return [] if make.empty?
    make.map{ |r| r.recipe_id}
  end
end
