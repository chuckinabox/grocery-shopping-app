class Item < ApplicationRecord
  require 'active_support/inflector'
  belongs_to :user
  belongs_to :make_recipe

  validates :name, presence: true


  def self.create_or_consolidate(recipe, ingredient)
    Item.create!(make_recipe_id: recipe.id, user: recipe.user, name: ActiveSupport::Inflector.singularize(ingredient[:name]), units: ingredient[:unit], quantity: ingredient[:quantity], check: false)
  end
end
