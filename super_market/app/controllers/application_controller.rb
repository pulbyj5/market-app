class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    before_action :validate_request
    #rescue_from ActiveRecord::ActiveRecordError, with: :active_record_error
    rescue_from JWT::DecodeError, with: :token_error

    private

    @@secret = "THIS IS A SECRET KEY"

    def tokenize(employee_id)
        payload = { employee_id: employee_id , exp: (10).hours.from_now.to_i}
        token = JWT.encode(payload, @@secret, 'HS256')
        return token
    end

    def authorize_user(token)
        #begin
        payload = JWT.decode(token, @@secret, true, { algorithm: 'HS256' })
        #rescue #JWT::VerificationError
        #return {status: "error", error:"decode error"}
        #end
        return payload[0]
    end

    def validate_request
        if !(params[:controller] == "api/v1/auth" && params[:action] == "login")
            p params;
            token = request.headers["Authorization"]
            token = token.gsub(/^Bearer /, '') if token && token.match(/^Bearer /)
            p token
            if(!token)
                render json: {status: "error", error: {message: "Token not found"}}
            else
                payload = authorize_user token;
                puts "payload"
                p payload;
                @authenticated_user = User.find_by({employee_id: payload["employee_id"]});
                if @authenticated_user
                    params[:authenticated_user_id] = @authenticated_user.id
                else
                    render json: {status: "error", error: {message: "Unauthorized access"}}
                end
            end
        end
    end

    # ERRORS
    def active_record_error(_e)
        if _e.is_a?ActiveRecord::RecordNotFound
            render json: {status: "error",error: {message: "Corrosponding record does not exist!",type: "DB error"}}, status: :not_found
        elsif  _e.is_a?ActiveRecord::RecordNotUnique
            render json: {status: "error",error: {message: "Corrosponding ID already exist!", type: "DB error"}}, status: :conflict

        else
            render json: {status: "error", error: {message: _e.message, type: "DB error"}}, status: :not_acceptable
        end
    end

    def token_error(_e)
        if _e.is_a?JWT::ExpiredSignature
            render json: {status: "error",error: {message: "Token expired!",type: "token error"}}, status: :unauthorized
        elsif _e.is_a?JWT::VerificationError
            render json: {status: "error",error: {message: "Invalid token!",type: "token error"}}, status: :unauthorized
        else
            render json: {status: "error", error: {message: _e.message, type: "token error"}}, status: :unauthorized
        end
    end
end
