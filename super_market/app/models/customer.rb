class Customer < ApplicationRecord
    has_many :purchases
    has_many :products, through: :purchases


    validates :name, format: { with: /\A[a-z A-Z]+\z/, message:"Enter a valid name"}, presence: true,length: { minimum: 2, maximum: 40 ,message: "name must be 2 to 40 characters long"}
    validates :id, numericality: true, inclusion: {in: 100..999999999999,message: "id should be 3 to 12 digits long"}, presence: true
    validates :age, numericality: true, inclusion: {in: 0..150,message: "should be in 10 to 150"}, presence: true
    validates :email_id, format: { with: URI::MailTo::EMAIL_REGEXP, message:"Enter a valid email address"}, presence: true,length: { minimum: 3, maximum: 40 ,message: "must be 3 to 40 characters long"}
    validates :phone_no, numericality: true, inclusion: {in: 1000000000..9999999999, message: "phone_no should be 10 digits long"}, presence: true
    validates :sex, presence: true,inclusion: { in: %w(male female other),message: "enter valid sex {male,female or other}" } 
    validates :address, format: { with: /\A[a-z,._ A-Z0-9]+\z/}, presence: true,length: { minimum: 10, maximum: 100 ,message: "address must be 10 to 100 characters long"}
end
