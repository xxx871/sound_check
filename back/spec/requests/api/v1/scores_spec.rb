require 'rails_helper'

RSpec.describe "Api::V1::Scores" do
  let(:user) { create(:user) }
  let(:mode) { create(:mode) }
  let(:difficulty) { create(:difficulty) }
  let(:headers) { { 'ACCEPT' => 'application/json' } }

  def auth_headers
    post('/api/v1/auth/sign_in', params: { email: user.email, password: user.password }, headers:)
    response.headers.slice('client', 'access-token', 'uid')
  end

  def authenticated_headers
    headers.merge(auth_headers)
  end

  def create_score(score = 100)
    patch('/api/v1/scores', params: { mode_id: mode.id, difficulty_id: difficulty.id, score: }, headers: authenticated_headers)
  end

  describe 'PATCH /api/v1/scores' do
    context 'when user is authenticated' do
      it 'creates a new score when it does not exist' do
        aggregate_failures do
          expect { create_score }.to change(Score, :count).by(1)
          expect(response).to have_http_status(:created)
          expect(response.parsed_body['status']).to eq('created')
        end
      end
    end

    context 'when user is not authenticated' do
      it 'returns unauthorized status' do
        patch('/api/v1/scores', params: { mode_id: mode.id, difficulty_id: difficulty.id, score: 100 }, headers:)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'PATCH /api/v1/scores with existing scores' do
    let!(:existing_score) { create(:score, user:, mode:, difficulty:, score: 50) }

    def expect_score_update(new_score, status, expected_score)
      create_score(new_score)
      expect(response).to have_http_status(:ok)
      expect(response.parsed_body['status']).to eq(status)
      expect(existing_score.reload.score).to eq(expected_score)
    end

    it 'updates the score when new score is higher' do
      expect_score_update(100, 'updated', 100)
    end

    it 'does not update the score when new score is lower' do
      expect_score_update(30, 'not_updated', 50)
    end

    context 'when user is not authenticated' do
      it 'returns unauthorized status' do
        patch('/api/v1/scores', params: { mode_id: mode.id, difficulty_id: difficulty.id, score: 100 }, headers:)
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /api/v1/scores/ranking' do
    before do
      create_list(:score, 10, mode:, difficulty:)
    end

    it 'returns top 10 scores' do
      get("/api/v1/scores/ranking", params: { mode_id: mode.id, difficulty_id: difficulty.id }, headers:)

      aggregate_failures do
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body.length).to eq(10)
      end
    end

    it 'includes user name in the response' do
      get("/api/v1/scores/ranking", params: { mode_id: mode.id, difficulty_id: difficulty.id }, headers:)

      expect(response.parsed_body.first['user']['name']).to be_present
    end
  end
end
