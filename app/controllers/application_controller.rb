class ApplicationController < ActionController::API
  include Knock::Authenticable
  include ExceptionHandler
  respond_to :json
end
