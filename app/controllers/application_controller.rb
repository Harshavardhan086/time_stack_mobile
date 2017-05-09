class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception


  private

  def oauth_client
    @oauth_client ||= OAuth2::Client.new(CONFIG["oauth_token"], CONFIG["oauth_secret"],site: CONFIG["server_base_url"])
    logger.debug("OAUTH CLIENT IS: #{@oauth_client}**********")
    @oauth_client
  end
  def access_token
  	if session[:access_token]
  	 @access_token ||= OAuth2::AccessToken.new(oauth_client, session[:access_token] )
  	 logger.debug("INTHEAPPLICATION: #{@access_token}")
     @access_token
    end
  end

end
