class CreateCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :customers do |t|
      t.string :name
      t.integer :age
      t.string :email_id
      t.integer :phone_no
      t.string :sex
      t.string :address

      t.timestamps
    end
  end
end
