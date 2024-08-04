require 'rails_helper'

RSpec.describe "Api::V1::Difficulties" do
  describe "GET /api/v1/difficulties" do
    before do
      create_list(:difficulty, 3)
    end

    it "returns success status" do
      get '/api/v1/difficulties'
      expect(response).to have_http_status(:success)
    end

    it "returns all difficulties" do
      get '/api/v1/difficulties'
      expect(response.parsed_body.size).to eq(3)
    end

    it "returns difficulties with correct attributes" do
      get '/api/v1/difficulties'
      expect(response.parsed_body.first).to include('id', 'name')
    end
  end
end
