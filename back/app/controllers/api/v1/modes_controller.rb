module Api
  module V1
    class ModesController < ApplicationController
      def index
        modes = Mode.all
        render json: modes
      end
    end
  end
end
