require 'rails_helper'

RSpec.describe Difficulty do
  it { is_expected.to have_many(:scores) }
  it { is_expected.to validate_presence_of(:name) }

  it "is valid with valid attributes" do
    difficulty = build(:difficulty)
    expect(difficulty).to be_valid
  end

  it "is not valid without a name" do
    difficulty = build(:difficulty, name: nil)
    expect(difficulty).not_to be_valid
  end
end
