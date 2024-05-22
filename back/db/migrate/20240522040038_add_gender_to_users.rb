class AddGenderToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :gender, null: true, foreign_key: true
  end
end
