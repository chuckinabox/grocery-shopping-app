class Item < ApplicationRecord
  require 'active_support/inflector'
  belongs_to :user
  belongs_to :make_recipe, optional: true

  validates :name, presence: true
  validates :quantity, numericality: {greater_than: 0}

end
