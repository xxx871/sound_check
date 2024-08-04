require 'rails_helper'

RSpec.describe "Api::V1::Auth::Oauth" do
  describe "POST /api/v1/auth/oauth" do
    let(:user_data) { { email: 'test@example.com', name: 'Test User' } }

    context "when user does not exist" do
      it "creates a new user" do
        expect do
          post '/api/v1/auth/oauth', params: { user: user_data }
        end.to change(User, :count).by(1)
      end

      it "returns a success status" do
        post '/api/v1/auth/oauth', params: { user: user_data }
        expect(response).to have_http_status(:success)
      end
    end

    context "when user already exists" do
      before do
        create(:user, email: user_data[:email])
      end

      it "does not create a new user" do
        expect do
          post '/api/v1/auth/oauth', params: { user: user_data }
        end.not_to change(User, :count)
      end

      it "returns a success status" do
        post '/api/v1/auth/oauth', params: { user: user_data }
        expect(response).to have_http_status(:success)
      end
    end
  end
end
