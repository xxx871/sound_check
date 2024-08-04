require 'rails_helper'

RSpec.describe Note do
  it { is_expected.to have_many(:user_high_notes) }
  it { is_expected.to have_many(:users_with_high_notes).through(:user_high_notes) }
  it { is_expected.to have_many(:user_low_notes) }
  it { is_expected.to have_many(:users_with_low_notes).through(:user_low_notes) }
  it { is_expected.to have_many(:gender_high_notes) }
  it { is_expected.to have_many(:genders_with_high_notes).through(:gender_high_notes) }
  it { is_expected.to have_many(:gender_low_notes) }
  it { is_expected.to have_many(:genders_with_low_notes).through(:gender_low_notes) }

  it "is valid with valid attributes" do
    note = build(:note)
    expect(note).to be_valid
  end

  describe "associations with users and genders" do
    let(:note) { create(:note) }
    let(:user) { create(:user) }
    let(:gender) { create(:gender) }

    before do
      create(:user_high_note, user:, note:)
      create(:user_low_note, user:, note:)
      create(:gender_high_note, gender:, note:)
      create(:gender_low_note, gender:, note:)
    end

    it "can be associated with a user as a high note" do
      expect(note.users_with_high_notes).to include(user)
    end

    it "can be associated with a user as a low note" do
      expect(note.users_with_low_notes).to include(user)
    end

    it "can be associated with a gender as a high note" do
      expect(note.genders_with_high_notes).to include(gender)
    end

    it "can be associated with a gender as a low note" do
      expect(note.genders_with_low_notes).to include(gender)
    end
  end
end
