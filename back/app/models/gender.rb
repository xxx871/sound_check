class Gender < ApplicationRecord
  has_many :users, dependent: :destroy
  has_one :gender_high_note, dependent: :destroy
  has_one :high_note, through: :gender_high_note, source: :note
  has_one :gender_low_note, dependent: :destroy
  has_one :low_note, through: :gender_low_note, source: :note
end
