module Api
  module V1
    module Auth
      class PasswordsController < DeviseTokenAuth::PasswordsController
        before_action :configure_permitted_parameters, if: :devise_controller?
        
        protected
        
        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:account_update, keys: [:password, :password_confirmation, :reset_password_token])
        end

        def resource_params
          params.permit(:email, :password, :password_confirmation, :reset_password_token, :redirect_url)
        end

        def redirect_options
          {
            allow_other_host: true
          }
        end
      end
    end
  end
end
