module Api
  module V1
    class NotesController < ApplicationController
      def index
        notes = Note.all
        render json: notes
      end

      def show
        note = Note.find_by(id: params[:id])
        if note
          render json: note
        else
          render json: { error: 'Note not found' }, status: :not_found
        end
      end
    end
  end
end