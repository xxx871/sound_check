module Api
  module V1
    class ModesController < ApplicationController
      def index
        modes = Mode.all
        render json: modes
      end

      def show
        mode = Mode.find_by(id: params[:id])
        if mode
          render json: mode
        else
          render json: { error: 'Mode not found' }, status: :not_found
        end
      end
    end
  end
end
