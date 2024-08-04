require 'rails_helper'

RSpec.describe User do
  it { is_expected.to belong_to(:gender).optional }
  it { is_expected.to have_one(:user_high_note) }
  it { is_expected.to have_one(:high_note).through(:user_high_note) }
  it { is_expected.to have_one(:user_low_note) }
  it { is_expected.to have_one(:low_note).through(:user_low_note) }
  it { is_expected.to have_many(:scores) }
  it { is_expected.to have_many(:modes).through(:scores) }
  it { is_expected.to have_many(:difficulties).through(:scores) }

  it "is valid with valid attributes" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "is not valid without an email" do
    user = build(:user, email: nil)
    expect(user).not_to be_valid
  end

  it "is not valid without a password" do
    user = build(:user, password: nil)
    expect(user).not_to be_valid
  end

  describe "associations with high and low notes" do
    let(:user) { create(:user) }
    let(:high_note) { create(:note) }
    let(:low_note) { create(:note) }

    before do
      create(:user_high_note, user:, note: high_note)
      create(:user_low_note, user:, note: low_note)
    end

    it "can have an associated high note" do
      expect(user.high_note).to eq(high_note)
    end

    it "can have an associated low note" do
      expect(user.low_note).to eq(low_note)
    end
  end

  it "can have multiple scores" do
    user = create(:user)
    score1 = create(:score, user:)
    score2 = create(:score, user:)

    expect(user.scores).to include(score1, score2)
  end
end
