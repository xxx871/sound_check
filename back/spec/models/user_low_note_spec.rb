require 'rails_helper'

RSpec.describe UserLowNote do
  subject { create(:user_low_note) }

  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:note) }
  it { is_expected.to validate_uniqueness_of(:user_id) }

  it "is valid with valid attributes" do
    expect(build(:user_low_note)).to be_valid
  end

  it "is not valid without a user" do
    expect(build(:user_low_note, user: nil)).not_to be_valid
  end

  it "is not valid without a note" do
    expect(build(:user_low_note, note: nil)).not_to be_valid
  end

  it "does not allow a user to have multiple low notes" do
    user_low_note1 = create(:user_low_note)
    user_low_note2 = build(:user_low_note, user: user_low_note1.user)
    expect(user_low_note2).not_to be_valid
  end
end
