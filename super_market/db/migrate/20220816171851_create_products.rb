class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name,null: false
      t.string :batch,null: false
      t.string :p_type,null: false
      t.string :brand,null: false
      t.float :price,null: false
      t.integer :stock,null: false

      t.timestamps
    end
  end
end
