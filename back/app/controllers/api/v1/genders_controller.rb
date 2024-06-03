module Api
  module V1
    class GendersController < ApplicationController
      def index
        genders = Gender.all
        render json: genders
      end

      def notes_range
        gender_id = params[:id].to_i
        low_note = GenderLowNote.find_by(gender_id: gender_id).note
        high_note = GenderHighNote.find_by(gender_id: gender_id).note
        notes = Note.where(frequency: low_note.frequency..high_note.frequency)
        render json: notes
      end
    end
  end
end