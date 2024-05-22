class UserHighNote < ApplicationRecord
  belongs_to :user
  belongs_to :note

  validates :user_id, uniqueness: true
end
