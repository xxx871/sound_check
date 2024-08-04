class Mode < ApplicationRecord
  has_many :scores, dependent: :destroy
  validates :name, presence: true
end