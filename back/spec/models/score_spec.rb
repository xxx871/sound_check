require 'rails_helper'

RSpec.describe Score do
  subject { create(:score) }

  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:mode) }
  it { is_expected.to belong_to(:difficulty) }
  it { is_expected.to validate_uniqueness_of(:user_id).scoped_to([:mode_id, :difficulty_id]).with_message("should have unique score per mode and difficulty") }

  it "is valid with valid attributes" do
    expect(build(:score)).to be_valid
  end

  it "is not valid without a user" do
    expect(build(:score, user: nil)).not_to be_valid
  end

  it "is not valid without a mode" do
    expect(build(:score, mode: nil)).not_to be_valid
  end

  it "is not valid without a difficulty" do
    expect(build(:score, difficulty: nil)).not_to be_valid
  end

  it "does not allow duplicate scores for the same user, mode, and difficulty" do
    score1 = create(:score)
    score2 = build(:score, user: score1.user, mode: score1.mode, difficulty: score1.difficulty)
    expect(score2).not_to be_valid
  end
end
