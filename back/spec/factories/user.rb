FactoryBot.define do
  factory :user do
    name { 'test' }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    gender
  end
end
