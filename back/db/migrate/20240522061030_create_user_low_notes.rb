class CreateUserLowNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :user_low_notes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :note, null: false, foreign_key: true

      t.timestamps
    end
  end
end
