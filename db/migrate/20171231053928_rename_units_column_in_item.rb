class RenameUnitsColumnInItem < ActiveRecord::Migration[5.1]
  def change
    rename_column :items, :units, :unit
  end
end
