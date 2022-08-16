class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :batch
      t.string :type
      t.string :brand
      t.float :price
      t.integer :stock

      t.timestamps
    end
  end
end
