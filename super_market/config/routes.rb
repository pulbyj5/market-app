Rails.application.routes.draw do


  
  get "/api/v1/customers", to: "api/v1/customers#getCustomers"
  
  get "/api/v1/customers/:id/purchases", to: "api/v1/customers#getPurchasesWithCustomerID"

  post "/api/v1/customers", to: "api/v1/customers#addCustomer"

  delete "/api/v1/customers", to: "api/v1/customers#deleteCustomer"

  patch "/api/v1/customers", to: "api/v1/customers#editCustomer"




  get "/api/v1/products", to: "api/v1/products#getProducts"

  post "/api/v1/products", to: "api/v1/products#addProduct"

  delete "/api/v1/products", to: "api/v1/products#deleteProduct"

  patch "/api/v1/products", to: "api/v1/products#editProduct"



  get "/api/v1/purchases", to: "api/v1/purchases#getPurchases"
  
  post "/api/v1/purchases", to: "api/v1/purchases#addPurchase"

  delete "/api/v1/purchases", to: "api/v1/purchases#deletePurchase"

  patch "/api/v1/purchases", to: "api/v1/purchases#editPurchase"



  get "/api/v1/users", to: "api/v1/users#getUser"
  
  post "/api/v1/users", to: "api/v1/users#addUser"

  delete "/api/v1/users", to: "api/v1/users#deleteUser"

  patch "/api/v1/users", to: "api/v1/users#editUser"

  

  post "/api/v1/auth/login", to: "api/v1/auth#login"

  post "/api/v1/auth/logout", to: "api/v1/auth#logout"


end
