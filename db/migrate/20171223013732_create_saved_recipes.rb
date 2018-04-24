class CreateSavedRecipes < ActiveRecord::Migration[5.1]
  def change
    create_table :saved_recipes do |t|
      t.references :user, foreign_key: true
      t.integer :recipe_id, null: false

      t.timestamps
    end
  end
end
