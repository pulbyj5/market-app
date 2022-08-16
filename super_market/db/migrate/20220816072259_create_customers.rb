class CreateCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :customers do |t|
      t.string :name, null: false
      t.integer :age
      t.string :email_id, null: false
      t.integer :phone_no, null: false
      t.string :sex
      t.string :address

      t.timestamps
    end
  end
end
