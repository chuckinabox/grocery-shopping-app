class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.references :user, foreign_key: true
      t.references :make_recipe, foreign_key: true
      t.decimal :quantity, scale: 2, precision: 10
      t.text :name, null: false
      t.boolean :check, default: false, null: false
      t.text :units

      t.timestamps
    end
  end
end
