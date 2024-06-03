Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
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
      resources :modes, only: [:index]
      resources :notes, only: [:index, :show] do
        collection do
          get 'range'
        end
      end
    end
  end
end