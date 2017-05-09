module ApplicationHelper
	def new_oauth_token_path
		logger.debug("************#{CONFIG['server_base_url']}")
  	"#{CONFIG['server_base_url']}/oauth/authorize?client_id=#{CONFIG['oauth_token']}&redirect_uri=#{CONFIG['oauth_redirect_uri']}&response_type=code"
	end
end
