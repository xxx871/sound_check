FactoryBot.define do
  factory :note do
    frequency { rand(20..2000) }
    sequence(:ja_note_name) { |n| "Note #{n}" }
    sequence(:en_note_name) { |n| "Note #{n}" }
  end
end
