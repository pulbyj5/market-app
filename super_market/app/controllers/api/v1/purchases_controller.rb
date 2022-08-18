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
            elsif param[0] == :status
                @params[:status] = param[1]
            end
        end

        if @params.length > 0
            @purchases = Purchase.where(@params)
        else
            @purchases = Purchase.all
        end
        render json: {status:"ok", data: @purchases}
    end

    def addPurchase

        @prod = Product.find(params[:product_id]);

        if(@prod && @prod[:stock] >= params[:quantity]) 
            ActiveRecord::Base.transaction do
                @d_t = params[:date_and_time].to_time
                Purchase.create!(customer_id: params[:customer_id],product_id: params[:product_id], 
                    quantity: params[:quantity], date_and_time:@d_t,
                    status: params[:status])
                @prod.update!(stock: @prod[:stock]-params[:quantity])
                render json: {status:"ok"}
            end
        else
            render json: {status:"error",error:{message:"product does not have enough stock"}}
        end
    end

    def deletePurchase
        ActiveRecord::Base.transaction do
            @purchase = Purchase.find_by!(id: params[:id])
            @prod = @purchase.product
            if(@purchase[:status] == "success")
                @prod.update!(stock: @prod[:stock]+@purchase[:quantity])
            end
            @purchase.destroy!
        end
        
        render json: {status:"ok"}
    end

    def editPurchase
        @purchase = Purchase.find_by!(id: params[:id])
        @prod = @purchase.product
        @update_data = {}
        params[:data].to_unsafe_h.symbolize_keys.each do |param|
            case param[0] 
                when :quantity
                  @update_data[:quantity] = param[1]
                when :date_and_time
                  @update_data[:date_and_time] = param[1].to_time
                when :status
                  @update_data[:status] = param[1]
                else
            end
        end
        if @update_data.length > 0
            if @update_data[:status] == "returned"
                ActiveRecord::Base.transaction do
                    @prod.update!(stock: @prod[:stock]+@purchase[:quantity])
                    @purchase.update!(@update_data)
                end
                render json: {status:"ok"}
            elsif @update_data[:quantity]
                if @prod[:stock]+@purchase[:quantity]-@update_data[:quantity] > 0
                    ActiveRecord::Base.transaction do
                        @prod.update!(stock: @prod[:stock]+@purchase[:quantity]-@update_data[:quantity])
                        @purchase.update!(@update_data)
                    end
                    render json: {status:"ok"}
                else
                    render json: {status:"error",error:{message:"stock is not enough for this update"}}
                end
                
            else
                @purchase.update!(@update_data)
                render json: {status:"ok"}
            end
        else
            render json: {status:"error",error:{message:"invalid update data"}}
        end
            
    end

end
