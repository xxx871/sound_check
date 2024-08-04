FactoryBot.define do
  factory :difficulty do
    sequence(:name) { |n| "Difficulty #{n}" }
  end
end
