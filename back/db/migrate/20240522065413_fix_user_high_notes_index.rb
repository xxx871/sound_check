class FixUserHighNotesIndex < ActiveRecord::Migration[7.0]
  def change
    if index_exists?(:user_high_notes, :user_id, unique: true)
      remove_index :user_high_notes, :user_id
    end
  end
end
