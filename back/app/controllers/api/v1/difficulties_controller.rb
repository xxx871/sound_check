module Api
  module V1
    class DifficultiesController < ApplicationController

      def index
        difficulties = Difficulty.all
        render json: difficulties
      end
    end
  end
end
