class Api::V1::ProductsController < ApplicationController
    
    def getProducts
    #     @products= Product.all
    #   render json: [@products]

        @params = {}
        request.query_parameters.symbolize_keys.each do |param| 
            if param[0] == :id 
                @params[:id] = param[1]
            elsif param[0] == :name
                @params[:name] = param[1]
            elsif param[0] == :batch
                @params[:batch] = param[1]
            elsif param[0] == :type
                @params[:type] = param[1]
            elsif param[0] == :brand
                @params[:brand] = param[1]
            end
        end
        p @params
        if @params.length > 0
            @prod = Product.where(@params)
        else
            @prod = Product.all
        end
        render json: {status:"ok", data: @prod}
    end

  

    def addProduct
        Product.create!(name: params[:name],batch: params[:batch], type: params[:type],brand: params[:brand],price: params[:price],stock: params[:stock])
        render json: {message: "Successfully added"}
        # @prod= Product.new(product_params)
        # if @prod.save
        #     render json: {status:"ok", data: @prod}
        # else
        #     render error: { error: "Unable to create a user"},status:400
        #end
    end

    def deleteProduct
        @prod= Product.find(params[:id])
        if @prod
            @prod.destroy
            render json: {status:"ok", data: @prod}
        else
            render json: {error: "Unable to delete the product"}, status:400
        end
       
    end

    def editProduct
       @prod= Product.find(params[:id])
       if @prod
        @prod.update(product_params)
        render json: {status:"ok", data: @prod}
       else
        render json: {error: "Unable to update the product"},status:400
       end
    end

    private

    def product_params
        params.require(:product).permit(:name, :batch, :type, :brand, :price, :stock)
    end

end
