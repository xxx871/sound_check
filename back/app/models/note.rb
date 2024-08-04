class Note < ApplicationRecord
  has_many :user_high_notes, dependent: :destroy
  has_many :users_with_high_notes, through: :user_high_notes, source: :user
  has_many :user_low_notes, dependent: :destroy
  has_many :users_with_low_notes, through: :user_low_notes, source: :user

  has_many :gender_high_notes, dependent: :destroy
  has_many :genders_with_high_notes, through: :gender_high_notes, source: :gender
  has_many :gender_low_notes, dependent: :destroy
  has_many :genders_with_low_notes, through: :gender_low_notes, source: :gender
end
