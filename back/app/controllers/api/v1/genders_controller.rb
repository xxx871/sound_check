module Api
  module V1
    class GendersController < ApplicationController
      def index
        genders = Gender.all
        render json: genders
      end
    end
  end
end
