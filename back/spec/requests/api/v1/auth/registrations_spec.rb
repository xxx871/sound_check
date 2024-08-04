require 'rails_helper'

RSpec.describe "Api::V1::Auth::Registrations" do
  describe "POST /api/v1/auth" do
    let(:valid_attributes) { { email: 'test@example.com', password: 'password', password_confirmation: 'password', name: 'Test User' } }

    context "with valid attributes" do
      it "creates a new user" do
        expect do
          post '/api/v1/auth', params: valid_attributes
        end.to change(User, :count).by(1)
      end

      it "returns a success status" do
        post '/api/v1/auth', params: valid_attributes
        expect(response).to have_http_status(:success)
      end
    end

    context "with invalid attributes" do
      let(:invalid_attributes) { { email: 'invalid', password: 'short', name: '' } }

      it "does not create a new user" do
        expect do
          post '/api/v1/auth', params: invalid_attributes
        end.not_to change(User, :count)
      end

      it "returns unprocessable entity status" do
        post '/api/v1/auth', params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
