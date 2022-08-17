class Purchase < ApplicationRecord
  belongs_to :customer
  belongs_to :product

  validates :customer_id, numericality: true, inclusion: {in: 100..999999999999,message: "customer id should be 3 to 12 digits long"}, presence: true 
  validates :product_id, numericality: true, inclusion: {in: 100..999999999999,message: "product id should be 3 to 12 digits long"}, presence: true
  validates :quantity, numericality: true, inclusion: {in: 0..9999999999, message: "should be valid number"}, presence: true
  validates :date_and_time, presence: true
  validates :status, presence: true,inclusion: { in: %w(success returned),message: "enter valid status {success / returned}" }
  
end
