class ApplicationController < ActionController::API
  include Knock::Authenticable
  respond_to :json
end
