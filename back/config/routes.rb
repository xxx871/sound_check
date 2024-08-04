Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        passwords: 'api/v1/auth/passwords'
      }

      namespace :auth do
        resources :sessions, only: [:index]
        post 'oauth', to: 'oauth#create'
      end
      resource :user, only: [:show, :update]
      resources :difficulties, only: [:index]
      resources :genders, only: [:index] do
        get 'notes/range/:id', on: :collection, action: :notes_range
      end
      resources :modes, only: [:index, :show]
      resources :notes, only: [:index, :show] do
        collection do
          get 'range'
        end
      end
      patch 'scores', to: 'scores#update'
      get 'scores/ranking', to: 'scores#ranking'
    end
  end
end