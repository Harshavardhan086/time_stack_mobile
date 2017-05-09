class SessionsController < ApplicationController
  def create
    req_params = "client_id=#{CONFIG['oauth_token']}&client_secret=#{CONFIG['oauth_secret']}&code=#{params[:code]}&grant_type=authorization_code&redirect_uri=#{CONFIG['oauth_redirect_uri']}&email='harsha@test.com'"
    response = JSON.parse RestClient.post("#{CONFIG['server_base_url']}/oauth/token", req_params)
    logger.debug("******RESPONSE: #{response} ")
    session[:access_token] = response['access_token']
    logger.debug("******ACCES TOKEN IS: #{session[:access_token]} ")
    redirect_to root_path
    # auth = request.env["omniauth.auth"]
    # logger.debug("***auth : #{auth}")
    # user = User.find_by_provider_and_uid(auth["provider"], auth["uid"])
    # logger.debug("***user : #{user.inspect}")
    # session[:user_id] = user.id
    # session[:access_token] = auth["credentials"]["token"]
    # logger.debug("***session[:user_id] : #{session[:user_id].inspect}******session[:access_token] : #{session[:access_token]}")
    # redirect_to root_url
  end

  def destroy
  	logger.debug("*****THE USER IS : #{session[:user_id]} ")
  	session[:user_id] = nil
  	session[:access_token] = nil
  	redirect_to root_url
  end

end