module Api
  module V1
    class UserController < ApplicationController
      before_action :authenticate_api_v1_user!

      def show
        @user = current_api_v1_user
        render json: {
          id: @user.id,
          name: @user.name,
          email: @user.email,
          gender: @user.gender&.name,  # ここでgenderがオブジェクトか確認
          created_at: @user.created_at,
          updated_at: @user.updated_at,
          user_high_note: @user.high_note&.name,  # ここでhigh_noteがオブジェクトか確認
          user_low_note: @user.low_note&.name,  # ここでlow_noteがオブジェクトか確認
          scores: @user.scores.map { |score| 
            {
              id: score.id,
              mode: score.mode.name,
              difficulty: score.difficulty.name,
              score: score.score
            }
          }
        }
      end
    end
  end
end