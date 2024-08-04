require 'rails_helper'

RSpec.describe Gender do
  it { is_expected.to have_many(:users) }
  it { is_expected.to have_one(:gender_high_note) }
  it { is_expected.to have_one(:high_note).through(:gender_high_note) }
  it { is_expected.to have_one(:gender_low_note) }
  it { is_expected.to have_one(:low_note).through(:gender_low_note) }

  it "is valid with valid attributes" do
    gender = build(:gender)
    expect(gender).to be_valid
  end

  describe "associations with high and low notes" do
    let(:gender) { create(:gender) }
    let(:high_note) { create(:note) }
    let(:low_note) { create(:note) }

    before do
      create(:gender_high_note, gender:, note: high_note)
      create(:gender_low_note, gender:, note: low_note)
    end

    it "can have an associated high note" do
      expect(gender.high_note).to eq(high_note)
    end

    it "can have an associated low note" do
      expect(gender.low_note).to eq(low_note)
    end
  end
end
