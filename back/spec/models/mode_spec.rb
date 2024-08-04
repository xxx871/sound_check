require 'rails_helper'

RSpec.describe Mode do
  it { is_expected.to have_many(:scores) }
  it { is_expected.to validate_presence_of(:name) }

  it "is valid with valid attributes" do
    mode = build(:mode)
    expect(mode).to be_valid
  end

  it "is not valid without a name" do
    mode = build(:mode, name: nil)
    expect(mode).not_to be_valid
  end
end
