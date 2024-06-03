module Api
  module V1
    class GendersController < ApplicationController

      def index
        genders = Gender.all
        render json: genders
      end

      def notes
        gender = Gender.find(params[:id])
        if gender
          low_note = gender.low_note
          high_note = gender.high_note
          render json: { low_note: low_note, high_note: high_note }
        else
          render json: { error: "Gender not found" }, status: :not_found
        end
      end
    end
  end
end
