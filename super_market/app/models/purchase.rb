class Purchase < ApplicationRecord
  belongs_to :customer
  belongs_to :product

  validates :id, numericality: true, inclusion: {in: 100..999999999999,message: "id should be 3 to 12 digits long"}, presence: true 
  validates :customer_id, numericality: true, inclusion: {in: 100..999999999999,message: "customer id should be 3 to 12 digits long"}, presence: true 
  validates :product_id, numericality: true, inclusion: {in: 100..999999999999,message: "product id should be 3 to 12 digits long"}, presence: true
  validates :quantity, numericality: true, inclusion: {in: 0..9999999999, message: "should be valid number"}, presence: true
  validates_datetime :date_and_time, numericality: true inclusion {message: "Please enter valid Date and Time"}, presence: true
  validates :status, format: { with: /\A[a-z A-Z]+\z/, message:"Enter a valid status"}, presence: true,length: { minimum: 5, maximum: 15 ,message: "status should be either in stock or out of stock"}
  
end
