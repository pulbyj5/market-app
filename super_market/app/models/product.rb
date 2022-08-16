class Product < ApplicationRecord
    has_many :purchases
    has_many :customers, through: :purchases
end
