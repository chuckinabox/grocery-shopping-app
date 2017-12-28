class Item < ApplicationRecord
  require 'active_support/inflector'
  belongs_to :user
  belongs_to :make_recipe

  validates :name, presence: true


  def self.create_or_consolidate(recipe, ingredient)
    item = Item.where(make_recipe_id: recipe.id, user: recipe.user, name: ActiveSupport::Inflector.singularize(ingredient[:name]), units: ingredient[:unit])
    if item.present?
      item.update(quantity: (item.quantity + (ingredient[:quantity] || 0)))
    else
      Item.create!(make_recipe_id: recipe.id, user: recipe.user, name: ActiveSupport::Inflector.singularize(ingredient[:name]), units: ingredient[:unit], quantity: ingredient[:quantity], check: false)
    end

  end
end
