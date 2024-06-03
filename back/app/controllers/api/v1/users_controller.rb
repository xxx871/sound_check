module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_api_v1_user!

      def show
        @user = current_api_v1_user
        render json: {
          id: @user.id,
          name: @user.name,
          gender: @user.gender&.name,
          user_high_note: note_to_json(@user.high_note),
          user_low_note: note_to_json(@user.low_note),
          scores: @user.scores.map { |score| { mode: score.mode.name, difficulty: score.difficulty.name, score: score.score } }
        }
      end

      def update
        @user = current_api_v1_user

        # Update user attributes
        @user.assign_attributes(user_params.except(:high_note, :low_note, :gender))

        high_note_params = user_params[:high_note]
        low_note_params = user_params[:low_note]

        if high_note_params.present?
          high_note = Note.find_by(id: high_note_params[:id])
          if high_note.nil?
            render json: { errors: ["指定された音域高が見つかりません"] }, status: :unprocessable_entity
            return
          end
        end

        if low_note_params.present?
          low_note = Note.find_by(id: low_note_params[:id])
          if low_note.nil?
            render json: { errors: ["指定された音域低が見つかりません"] }, status: :unprocessable_entity
            return
          end
        end

        if high_note_params.present? && low_note_params.present?
          if high_note.frequency < low_note.frequency
            render json: { errors: ["音域高は音域低より低くすることはできません"] }, status: :unprocessable_entity
            return
          end
        end

        if user_params[:gender].present?
          gender = Gender.find_by(name: user_params[:gender])
          @user.gender = gender if gender
        end

        if high_note_params.present?
          user_high_note = UserHighNote.find_or_initialize_by(user: @user)
          user_high_note.note = high_note
          user_high_note.save
        end

        if low_note_params.present?
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
            user_high_note: note_to_json(@user.high_note),
            user_low_note: note_to_json(@user.low_note),
            updated_at: @user.updated_at
          }, status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :gender, high_note: [:id, :frequency, :ja_note_name, :en_note_name], low_note: [:id, :frequency, :ja_note_name, :en_note_name])
      end

      def note_to_json(note)
        return nil unless note

        {
          id: note.id,
          frequency: note.frequency,
          ja_note_name: note.ja_note_name,
          en_note_name: note.en_note_name
        }
      end
    end
  end
end
