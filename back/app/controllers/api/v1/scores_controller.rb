module Api
  module V1
    class ScoresController < ApplicationController
      before_action :authenticate_api_v1_user!, expect: [:ranking]

      def update
        mode_id = params[:mode_id]
        difficulty_id = params[:difficulty_id]
        new_score = params[:score].to_i

        current_score = current_api_v1_user.scores.find_by(mode_id: mode_id, difficulty_id: difficulty_id)
        
        if current_score
          if new_score > current_score.score
            current_score.update(score: new_score)
            render json: { status: 'updated', score: current_score }, status: :ok
          else
            render json: { status: 'not_updated', score: current_score }, status: :ok
          end
        else
          new_score_record = current_api_v1_user.scores.create(mode_id: mode_id, difficulty_id: difficulty_id, score: new_score)
          render json: { status: 'created', score: new_score_record }, status: :created
        end
      end

      def ranking
        mode_id = params[:mode_id]
        difficulty_id = params[:difficulty_id]
        scores = Score.where(mode_id: mode_id, difficulty_id: difficulty_id).order(score: :desc).limit(10)
        render json: scores.as_json(include: { user: { only: [:name] } })
      end
    end
  end
end
