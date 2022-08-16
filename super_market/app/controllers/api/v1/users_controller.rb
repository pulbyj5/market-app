class Api::V1::UsersController < ApplicationController
    def getUser
        @authenticated_user = User.find(params[:authenticated_user_id])
        @data_to_send = {
            id: @authenticated_user.id,
            employee_id: @authenticated_user.employee_id,
            name: @authenticated_user.employee_id,
            email_id: @authenticated_user.email_id
        }
        render json: {status:"ok", data:@data_to_send}
    end

    def addUser
        User.create!(employee_id: params[:employee_id],name: params[:name], 
            password: params[:password], email_id:params[:email_id])
        render json: {status:"ok"}
    end

    def deleteUser
        @authenticated_user = User.find(params[:authenticated_user_id])

        if @authenticated_user && @authenticated_user.employee_id == params[:employee_id] && @authenticated_user.password == params[:password]
            @authenticated_user.destroy!
            render json: {status:"ok"}
        else
            render json: {status:"error",error: {message: "invalid employee_id or password provided"}}
        end
    end

    def editUser
        @authenticated_user = User.find(params[:authenticated_user_id])
        @update_data = {}
        if @authenticated_user && @authenticated_user.employee_id == params[:employee_id]
            params[:data].to_unsafe_h.symbolize_keys.each do |param|
                case param[0]
                    when :employee_id  
                      @update_data[:employee_id] = param[1]
                    when :name
                      @update_data[:name] = param[1]
                    when :email_id
                      @update_data[:email_id] = param[1]
                    when :password
                      @update_data[:password] = param[1]
                    else
                    end
                end
            if @update_data 
                @authenticated_user.update!(@update_data)
            end
            render json: {status:"ok"}
        else
            render json: {status:"error",error: {message: "not allowed to edit other users data"}}
        end
    end
end
