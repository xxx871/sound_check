class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.integer :frequency
      t.string :ja_note_name
      t.string :en_note_name

      t.timestamps
    end
  end
end
