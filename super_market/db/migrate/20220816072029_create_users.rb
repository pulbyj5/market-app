class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :employee_id
      t.string :name
      t.string :email_id
      t.string :password

      t.timestamps
    end
  end
end
