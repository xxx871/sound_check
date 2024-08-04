require 'rails_helper'

RSpec.describe "Api::V1::Genders" do
  describe "GET /api/v1/genders" do
    before do
      create_list(:gender, 3)
    end

    it "returns success status" do
      get '/api/v1/genders'
      expect(response).to have_http_status(:success)
    end

    it "returns correct number of genders" do
      get '/api/v1/genders'
      expect(response.parsed_body.size).to eq(3)
    end
  end

  describe "GET /api/v1/genders/notes/range/:id" do
    let(:gender) { create(:gender) }
    let(:low_note) { create(:note, frequency: 100) }
    let(:high_note) { create(:note, frequency: 300) }
    let(:middle_note) { create(:note, frequency: 200) }

    before do
      create(:gender_low_note, gender:, note: low_note)
      create(:gender_high_note, gender:, note: high_note)
      middle_note # Ensure middle_note is created
    end

    it "returns success status" do
      get "/api/v1/genders/notes/range/#{gender.id}"
      expect(response).to have_http_status(:success)
    end

    it "returns correct number of notes" do
      get "/api/v1/genders/notes/range/#{gender.id}"
      expect(response.parsed_body.size).to eq(3)
    end

    it "returns notes with correct frequencies" do
      get "/api/v1/genders/notes/range/#{gender.id}"
      frequencies = response.parsed_body.pluck('frequency')
      expect(frequencies).to contain_exactly(100, 200, 300)
    end
  end
end
