class AddUniqueIndexToUserLowNotes < ActiveRecord::Migration[7.0]
  def change
    unless index_exists?(:user_low_notes, :user_id, unique: true)
      remove_index :user_low_notes, :user_id if index_exists?(:user_low_notes, :user_id)
      add_index :user_low_notes, :user_id, unique: true
    end
  end
end