require 'rails_helper'

RSpec.describe "Api::V1::Notes" do
  describe "GET /api/v1/notes" do
    before do
      create_list(:note, 3)
    end

    it "returns success status" do
      get '/api/v1/notes'
      expect(response).to have_http_status(:success)
    end

    it "returns correct number of notes" do
      get '/api/v1/notes'
      expect(response.parsed_body.size).to eq(3)
    end
  end

  describe "GET /api/v1/notes/:id" do
    let(:note) { create(:note) }

    context "when note exists" do
      it "returns success status" do
        get "/api/v1/notes/#{note.id}"
        expect(response).to have_http_status(:success)
      end

      it "returns the correct note" do
        get "/api/v1/notes/#{note.id}"
        expect(response.parsed_body['id']).to eq(note.id)
      end
    end

    context "when note does not exist" do
      it "returns not found status" do
        get "/api/v1/notes/999999"
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "GET /api/v1/notes/range" do
    let(:low_note) { create(:note, frequency: 100, en_note_name: 'C3') }
    let(:high_note) { create(:note, frequency: 300, en_note_name: 'C5') }
    let(:middle_note) { create(:note, frequency: 200, en_note_name: 'C4') }

    before do
      low_note
      high_note
      middle_note
    end

    context "with valid note range" do
      it "returns success status" do
        get "/api/v1/notes/range", params: { low: 'C3', high: 'C5' }
        expect(response).to have_http_status(:success)
      end

      it "returns correct number of notes" do
        get "/api/v1/notes/range", params: { low: 'C3', high: 'C5' }
        expect(response.parsed_body.size).to eq(3)
      end
    end

    context "with invalid note names" do
      it "returns unprocessable entity status" do
        get "/api/v1/notes/range", params: { low: 'Invalid', high: 'C5' }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
