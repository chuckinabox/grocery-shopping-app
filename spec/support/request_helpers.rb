module Requests
  module JsonHelpers
    def json
      JSON.parse(response.body)
    end
  end
  module Authentication
    def auth(user)
      token = Knock::AuthToken.new(payload: {sub: user.id}).token
      {
        'Authorization': "Bearer #{token}"
      }
    end
  end
end
