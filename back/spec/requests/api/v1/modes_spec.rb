require 'rails_helper'

RSpec.describe "Api::V1::Modes" do
  describe "GET /api/v1/modes" do
    before do
      create_list(:mode, 3)
    end

    it "returns success status" do
      get '/api/v1/modes'
      expect(response).to have_http_status(:success)
    end

    it "returns correct number of modes" do
      get '/api/v1/modes'
      expect(response.parsed_body.size).to eq(3)
    end
  end

  describe "GET /api/v1/modes/:id" do
    let(:mode) { create(:mode) }

    context "when mode exists" do
      it "returns success status" do
        get "/api/v1/modes/#{mode.id}"
        expect(response).to have_http_status(:success)
      end

      it "returns the correct mode" do
        get "/api/v1/modes/#{mode.id}"
        expect(response.parsed_body['id']).to eq(mode.id)
      end
    end

    context "when mode does not exist" do
      it "returns not found status" do
        get "/api/v1/modes/999999"
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
