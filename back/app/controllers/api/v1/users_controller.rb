module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_api_v1_user!

      def show
        @user = current_api_v1_user
        render json: {
          id: @user.id,
          name: @user.name,
          gender: @user.gender&.name,  # ここでgenderがオブジェクトか確認
          user_high_note: @user.high_note&.ja_note_name,  # ここでhigh_noteがオブジェクトか確認
          user_low_note: @user.low_note&.ja_note_name,  # ここでlow_noteがオブジェクトか確認
          scores: @user.scores.map { |score| { mode: score.mode.name, difficulty: score.difficulty.name, score: score.score } }
        }
      end
      
      def update
        @user = current_api_v1_user

        # Update user attributes
        @user.assign_attributes(user_params)

        high_note = params[:user][:high_note].present? ? Note.find_by(ja_note_name: params[:user][:high_note]) : @user.high_note
        low_note = params[:user][:low_note].present? ? Note.find_by(ja_note_name: params[:user][:low_note]) : @user.low_note

        if high_note && low_note && high_note.frequency < low_note.frequency
          render json: { errors: ["音域高は音域低より低くすることはできません"] }, status: :unprocessable_entity
          return
        end

        # Update related models
        if params[:user][:gender].present?
          gender = Gender.find_by(name: params[:user][:gender])
          @user.gender = gender if gender
        end

        if high_note
          user_high_note = UserHighNote.find_or_initialize_by(user: @user)
          user_high_note.note = high_note
          user_high_note.save
        end

        if low_note
          user_low_note = UserLowNote.find_or_initialize_by(user: @user)
          user_low_note.note = low_note
          user_low_note.save
        end

        if @user.save
          render json: {
            id: @user.id,
            name: @user.name,
            email: @user.email,
            gender: @user.gender&.name,
            user_high_note: @user.high_note&.ja_note_name,
            user_low_note: @user.low_note&.ja_note_name,
            updated_at: @user.updated_at
          }, status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email)
      end
    end
  end
end