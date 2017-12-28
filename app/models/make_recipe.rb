class MakeRecipe < ApplicationRecord
  belongs_to :user
  has_many :items, dependent: :destroy
  validates :recipe_id, uniqueness: { scope: :user, message: 'already a favourite'}, presence: true
end
