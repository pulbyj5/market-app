class Api::V1::PurchasesController < ApplicationController
    
    def getPurchases
        @params = {}
        request.query_parameters.symbolize_keys.each do |param| 
            if param[0] == :id 
                @params[:id] = param[1]
            elsif param[0] == :customer_id
                @params[:customer_id] = param[1]
            elsif param[0] == :product_id
                @params[:product_id] = param[1]
            elsif param[0] == :quantity
                @params[:quantity] = param[1]
            end
        end
        p @params
        if @params.length > 0
            @purchases = Purchase.where(@params)
        else
            @purchases = Purchase.all
        end
        render json: {status:"ok", data: @purchases}
    end

    end

    def addPurchase
     Product.create!(customer_id: params[:customer_id],product_id: params[:product_id], 
            quantity: params[:quantity], date_and_time:params[:date_and_time],
            status: params[:status])
     render json: {status:"ok"}
    end

    def deletePurchase
        @purchase = Purchase.find_by!(id: params[:id])
        @purchase.destroy!
        render json: {status:"ok"}
    end

    def editPurchase
        @purchase = Purchase.find_by!(id: params[:id])
        
        @update_data = {}
        params[:data].to_unsafe_h.symbolize_keys.each do |param|
            case param[0] 
                when :customer_id 
                  @update_data[:customer_id] = param[1]
                when :product_id
                  @update_data[:product_id] = param[1]
                when :quantity
                  @update_data[:quantity] = param[1]
                when :date_and_time
                  @update_data[:date_and_time] = param[1]
                when :status
                  @update_data[:status] = param[1]
                else
            end
            p @update_data
            if @update_data.length > 0
                @purchase.update!(@update_data)
            end
            render json: {status:"ok"}
        end
    end
end
