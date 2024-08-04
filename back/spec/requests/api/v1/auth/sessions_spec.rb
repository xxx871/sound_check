require 'rails_helper'

RSpec.describe "Api::V1::Auth::Sessions" do
  let(:user) { create(:user) }
  let(:auth_headers) do
    post '/api/v1/auth/sign_in', params: { email: user.email, password: user.password }
    response.headers.slice('client', 'access-token', 'uid')
  end

  describe "GET /api/v1/auth/sessions" do
    context "when user is logged in" do
      it "returns success status" do
        get '/api/v1/auth/sessions', headers: auth_headers
        expect(response).to have_http_status(:success)
      end

      it "indicates that user is logged in" do
        get '/api/v1/auth/sessions', headers: auth_headers
        expect(response.parsed_body['is_login']).to be true
      end

      it "returns correct user id" do
        get '/api/v1/auth/sessions', headers: auth_headers
        expect(response.parsed_body['data']['id']).to eq(user.id)
      end
    end

    context "when user is not logged in" do
      it "returns success status" do
        get '/api/v1/auth/sessions'
        expect(response).to have_http_status(:success)
      end

      it "indicates that user is not logged in" do
        get '/api/v1/auth/sessions'
        expect(response.parsed_body['is_login']).to be false
      end

      it "returns correct message" do
        get '/api/v1/auth/sessions'
        expect(response.parsed_body['message']).to eq("ユーザーが存在しません")
      end
    end
  end
end
