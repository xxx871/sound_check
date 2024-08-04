require 'rails_helper'

RSpec.describe 'Password Reset' do
  let(:user) { create(:user) }
  let(:password_reset_url) { '/api/v1/auth/password' }

  describe 'POST /api/v1/auth/password' do
    context 'when メールアドレスが有効な場合' do
      it 'パスワードリセット指示を送信する' do
        post password_reset_url, params: { email: user.email }
        expect(response).to have_http_status(:ok)
      end

      it 'リセット指示のメッセージを返す' do
        post password_reset_url, params: { email: user.email }
        expect(response.parsed_body['message']).to eq("'#{user.email}' にパスワードリセットの案内が送信されました。")
      end

      it 'メールを送信する' do
        expect do
          post password_reset_url, params: { email: user.email }
        end.to change { ActionMailer::Base.deliveries.count }.by(1)
      end
    end

    context 'when メールアドレスが無効な場合' do
      it 'エラーステータスを返す' do
        post password_reset_url, params: { email: 'invalid@example.com' }
        expect(response).to have_http_status(:not_found)
      end

      it 'エラーメッセージを返す' do
        post password_reset_url, params: { email: 'invalid@example.com' }
        expect(response.parsed_body['errors']).to include("メールアドレス 'invalid@example.com' のユーザーが見つかりません。")
      end
    end
  end
end
