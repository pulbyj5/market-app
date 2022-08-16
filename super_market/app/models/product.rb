class Product < ApplicationRecord
    has_many :purchases
    has_many :customers, through: :purchases


    validates :name, format: { with: /\A[a-z _.A-Z]+\z/, message:"Enter a valid name"}, presence: true,length: { minimum: 2, maximum: 40 ,message: "name must be 2 to 40 characters long"}
    validates :batch, format: { with: /\A[a-z _A-Z0-9]+\z/, message:"Enter a valid batch"}, presence: true,length: { minimum: 2, maximum: 40 ,message: "Batch must be 2 to 40 characters long"}
   validates :brand, format: { with: /\A[a-z _.,A-Z]+\z/, message:"Enter a valid brand"}, presence: true,length: { minimum: 2, maximum: 40 ,message: "brand must be 2 to 40 characters long"}
    validates :price,presence:true, numericality: {only_float: true}
    validates :stock, numericality: true, inclusion: {in: 0..999999999999,message: "stock should be 1 to 12 digits long"}, presence: true
    # validates :id, numericality: true, inclusion: {in: 100..999999999999,message: "id should be 3 to 12 digits long"}, presence: true


    
end
