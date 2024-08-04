require 'rails_helper'

RSpec.describe GenderHighNote do
  describe "validations" do
    subject { create(:gender_high_note) }

    it { is_expected.to validate_uniqueness_of(:gender_id).scoped_to(:note_id) }
  end

  it "is valid with valid attributes" do
    gender_high_note = build(:gender_high_note)
    expect(gender_high_note).to be_valid
  end

  it "is not valid without a gender" do
    gender_high_note = build(:gender_high_note, gender: nil)
    expect(gender_high_note).not_to be_valid
  end

  it "is not valid without a note" do
    gender_high_note = build(:gender_high_note, note: nil)
    expect(gender_high_note).not_to be_valid
  end
end
