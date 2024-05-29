# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  belongs_to :gender, optional: true

  has_one :user_high_note
  has_one :high_note, through: :user_high_note, source: :note
  has_one :user_low_note
  has_one :low_note, through: :user_low_note, source: :note

  has_many :scores
  has_many :modes, through: :scores
  has_many :difficulties, through: :scores
end
