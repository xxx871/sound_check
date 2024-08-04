require 'rails_helper'

RSpec.describe "Api::V1::Users" do
  let(:user) { create(:user) }
  let(:headers) { { 'ACCEPT' => 'application/json' } }
  let(:auth_headers) do
    post('/api/v1/auth/sign_in', params: { email: user.email, password: user.password }, headers:)
    response.headers.slice('client', 'access-token', 'uid')
  end
  let(:authenticated_headers) { headers.merge(auth_headers) }

  describe "PUT /api/v1/user" do
    def create_gender
      create(:gender)
    end

    def create_high_note
      create(:note)
    end

    def create_low_note(high_note = nil, frequency_difference = -100)
      high_note ||= create_high_note
      create(:note, frequency: high_note.frequency + frequency_difference)
    end

    def create_update_params(options = {})
      gender = create_gender
      high_note = options[:high_note] || create_high_note
      low_note = options[:low_note] || create_low_note(high_note)
      {
        user: {
          name: options[:name] || 'New Name',
          gender: options[:gender] || gender.name,
          high_note: { id: options[:high_note_id] || high_note.id },
          low_note: { id: options[:low_note_id] || low_note.id }
        }.compact
      }
    end

    context "with valid parameters" do
      def high_note
        @high_note ||= create_high_note
      end

      def low_note
        @low_note ||= create_low_note(high_note)
      end

      def expected_gender_name
        @expected_gender_name ||= create_gender.name
      end

      before do
        put('/api/v1/user', params: create_update_params(gender: expected_gender_name, high_note:, low_note:), headers: authenticated_headers)
      end

      it "returns ok status" do
        expect(response).to have_http_status(:ok)
      end

      it "updates user name" do
        expect(response.parsed_body['name']).to eq('New Name')
      end

      it "updates user gender" do
        expect(response.parsed_body['gender']).to eq(expected_gender_name)
      end

      it "updates user high note" do
        expect(response.parsed_body['user_high_note']['id']).to eq(high_note.id)
      end

      it "updates user low note" do
        expect(response.parsed_body['user_low_note']['id']).to eq(low_note.id)
      end
    end

    context "with invalid high note" do
      it "returns unprocessable_entity status and error message" do
        put '/api/v1/user', params: create_update_params(high_note_id: 9999), headers: authenticated_headers
        aggregate_failures do
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.parsed_body['errors']).to include("指定された音域高が見つかりません")
        end
      end
    end

    context "with invalid low note" do
      it "returns unprocessable_entity status and error message" do
        put '/api/v1/user', params: create_update_params(low_note_id: 9999), headers: authenticated_headers
        aggregate_failures do
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.parsed_body['errors']).to include("指定された音域低が見つかりません")
        end
      end
    end

    context "when high note is lower than low note" do
      def create_invalid_notes
        high_note = create_high_note
        low_note = create_low_note(high_note, 100)
        [high_note, low_note]
      end

      def send_invalid_request(high_note, low_note)
        put('/api/v1/user', params: create_update_params(high_note:, low_note:), headers: authenticated_headers)
      end

      before do
        high_note, low_note = create_invalid_notes
        send_invalid_request(high_note, low_note)
      end

      it "returns unprocessable_entity status" do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "includes error message for note comparison" do
        expect(response.parsed_body['errors']).to include("音域高は音域低より低くすることはできません")
      end
    end
  end
end
