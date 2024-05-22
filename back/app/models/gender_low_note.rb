class GenderLowNote < ApplicationRecord
  belongs_to :gender
  belongs_to :note

  validates :gender_id, uniqueness: { scope: :note_id }
end
