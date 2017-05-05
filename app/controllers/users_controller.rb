class UsersController < ApplicationController

	def index
		logger.debug("******ACCES TOKEN IS: #{session[:access_token]} ")
		user_email = params[:email]
		if access_token
			@user_all_details = access_token.get("/api/users?email=#{user_email}").parsed
			# logger.debug("THE USERS DETAILS ARE: #{@user}")
		end
		@today_time_entry = @user_all_details['te'][0]
		@user = @user_all_details['u']
		@projects = @user_all_details['projects'].collect{|x| x['name']}
		logger.debug("***********index - #{@today_time_entry} ")
		# logger.debug("***********user - #{@user} ")
		# logger.debug("***********projects - #{@projects} ")

	end

	def project_tasks
		tasks_details = access_token.get("/api/project_tasks?project=#{params[:project]}").parsed if access_token
		
		tasks = tasks_details.collect{|x| x['description']}
		logger.debug("project_tasks-THE TASKS ARE: #{@tasks}")
		render json: tasks
	end

	def user_update
		time_entry_id = params[:time_entry_id]
		project_name = params[:project]
		task = params[:task]
		hours = params[:hours]
		description = params[:activity_log]
		sick = params[:sick]
		personal = params[:personal_day]
		logger.debug("intheuser_updatetime_entry_id: #{time_entry_id}, 
			project_name: #{project_name},
			task: #{task},
			hours: #{hours},
			description: #{description}")
		access_token.post("/api/user_updates", params: {time_entry_id: time_entry_id, 
			project_name: project_name,
			task: task,
			hours: hours,
			description: description,
			sick: sick,
			personal: personal})
	end

end
