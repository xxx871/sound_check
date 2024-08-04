module AuthorizationHelper
  def sign_in(user)
    post "/auth/sign_in/",
         params: { email: user[:email], password: user[:password] },
         as: :json

    response.headers.slice('client', 'access-token', 'uid')
  end

  def auth_headers
    user = create(:user)
    post '/api/v1/auth/sign_in',
         params: { email: user.email, password: user.password }
    {
      'access-token' => response.headers['access-token'],
      'client' => response.headers['client'],
      'uid' => response.headers['uid']
    }
  end
end
