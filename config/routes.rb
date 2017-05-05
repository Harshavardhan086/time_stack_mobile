Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'
  get '/oauth/callback', to: 'sessions#create'
  post '/user', to: 'users#index'
  get '/user/details', to: 'users#show'
  get '/user/logout', to: 'sessions#destroy'
  get '/project_tasks', to: 'users#project_tasks'
end
