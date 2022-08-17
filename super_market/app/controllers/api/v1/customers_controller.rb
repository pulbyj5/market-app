class Api::V1::CustomersController < ApplicationController
    
    def getCustomers
        @params = {}
        request.query_parameters.symbolize_keys.each do |param| 
            if param[0] == :id 
                @params[:id] = param[1]
            elsif param[0] == :name
                @params[:name] = param[1]
            elsif param[0] == :email_id
                @params[:email_id] = param[1]
            elsif param[0] == :phone_no
                @params[:phone_no] = param[1]
            elsif param[0] == :sex
                @params[:sex] = param[1]
            end
        end
        p @params
        if @params.length > 0
            @customers = Customer.where(@params)
        else
            @customers = Customer.all
        end
        render json: {status:"ok", data: @customers}
    end

    def getPurchasesWithCustomerID
    
    end

    def addCustomer
        Customer.create!(id: params[:id],name: params[:name], 
            age: params[:age], email_id:params[:email_id], phone_no: params[:phone_no],
            sex: params[:sex], address: params[:address])
        render json: {status:"ok"}
    end

    def deleteCustomer
        @customer = Customer.find_by!(id: params[:id])
        @customer.destroy!
        render json: {status:"ok"}
    end

    def editCustomer
        @customer = Customer.find_by!(id: params[:id])
        p @customer
        @update_data = {}
        params[:data].to_unsafe_h.symbolize_keys.each do |param|
            case param[0] 
                when :id  
                  @update_data[:id] = param[1]
                when :name
                  @update_data[:name] = param[1]
                when :age
                  @update_data[:age] = param[1]
                when :email_id
                  @update_data[:email_id] = param[1]
                when :phone_no
                  @update_data[:phone_no] = param[1]
                when :sex
                  @update_data[:sex] = param[1]
                when :address
                    @update_data[:address] = param[1]
                else
            end
        end
        p @update_data
        if @update_data.length > 0
            @customer.update!(@update_data)
        end
        render json: {status:"ok"}
    end
end
