Design Layout

Models

Users: 
id: default automated id in rails
employee_id [string], for log in purpose
name [ include a-z, A-Z & space ]
password [should be encrypted]

Customers: 
id [integer, we can keep this same as phone number], 
name: [ include a-z, A-Z & space ]
age: [integer, 10..150]
email_id: [string with valid email id format]
phone_no: [10 digit integer]
sex: [male/female/other]
address: [string, include a-z, A-Z, [space] & ‘,’
Product:
id: [integer]
batch(string [ddmmyyyy]), when the item is manufactured, different batch might have different price
name: [ include a-z, A-Z, space, ‘.’, ‘_’, ‘,’ ]
type: [string] (e.g. pen, shirt, soap,etc.)
brand: [string, include a-z, A-Z, space, ‘.’, ‘_’, ‘,’ ]
price: [float]
stocks [integer]


Purchases:
id: [integer]
customer_id: foreign key, customer table, belongs to association
product_id: foreign key, products table, belongs to association
quantity: [integer, minimum:0, maximum to be specified]
date_and_time: 
status [SUCCESS, RETURNED] string

API 
Customers: GET, POST, PATCH, DELETE
Products:  GET, POST, PATCH, DELETE
Purchases: GET, POST, PATCH, DELETE
Users:     POST, PATCH, DELETE 
