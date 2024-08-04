FactoryBot.define do
  factory :score do
    user
    mode
    difficulty
    score { rand(0..100) }
  end
end
