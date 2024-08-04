FactoryBot.define do
  factory :mode do
    sequence(:name) { |n| "Mode #{n}" }
  end
end
