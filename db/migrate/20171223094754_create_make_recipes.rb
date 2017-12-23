class CreateMakeRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :make_recipes do |t|
      t.references :user, foreign_key: true
      t.integer :recipe_id

      t.timestamps
    end
  end
end
