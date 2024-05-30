class Api::V1::Auth::OauthController < ApplicationController
  def create
    user_data = params.require(:user).permit(:id, :name, :email, :image)
    user = User.find_or_create_by(email: user_data[:email]) do |user|
      user.name = user_data[:name]
      user.password = SecureRandom.hex(10)
    end

    if user.persisted?
      token = user.create_new_auth_token

      response.headers.merge!(token)
      render json: { status: 'success', data: user }
    else
      render json: { status: 'error', message: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
