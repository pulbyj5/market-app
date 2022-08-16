class Api::V1::AuthController < ApplicationController

    def login
        @user = User.find_by(employee_id: params[:employee_id])
        if @user && @user.password == params[:password]
            tok = tokenize(@user.employee_id)
            render json: {status:"ok", data:{token:tok}}
        else
            render json: {status:"error", error:{message: "Incorrect employee_id or password"}}
        end
    end

    def logout
        render json: {status:"ok"}
    end
end
