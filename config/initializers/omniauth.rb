require File.expand_path('lib/omniauth/strategies/ts_mob', Rails.root)

Rails.application.config.middleware.use OmniAuth::Builder do
	provider :ts_mob,ENV["e261753bcdd72d34d98918fe2e997e7a0a040a740bbbaf479a26059b2007ff2a"],ENV["8ac2764c3caa1e625c53e0cae84ea2c3520a828aa21d92a32c877462856ce203"]	
end