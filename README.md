# se2021-02--SPG

## Installation Guide
 In a window terminal
 
 * git clone https://github.com/se2-p02/spg.git
 * cd SPG
 * cd server
 * npm install
 * nodemon server (nodemon is assumed to be already installed)

 On another terminal window
 * cd SPG
 * cd client
 * npm install
 * npm start

## React Client Application Routes

- Route `/`: main page with links to main page
- Route `/login`: login form for that in future will redirect to the user page
- Route `/employee`: display the possible actions available for an employee
- Route `/employee/clients`: display a the list of registered clients
- Route `/employee/clients/:id`: display the informations and orders of the client with client id = {id}
- Route `/employee/products`: display the list of available products
- Route `/employee/orders`: display the list of all orders
- Route `/employee/form` : shows the form used by the employee to register the users
  
## Database Tables

- Table `users` - contains **id name username email wallet basket hash email phoneNumber city address country role farmedId**
- Table `products` - contains **id name quantity unit farmer confirmed delivered price**
- Table `orders` - contains **id userID products address date time amount confPreparation**
- Table `farmers` - contains **id name confirmed**

## API Server

- POST `/api/sessions`
  - Request parameter: None.
  - Request body: An object representing the user (Content-Type: `application/json`).
  ``` 
  {
    "username": "manager",
    "password": "password"
  }
  ```
  - Response: `200 OK` (success) or `401 Unauthenticated user`.
  - Response body: user info if logged in.
  ```
  {
    "id": 1,
    "username": "manager"}
  }
  ```
  
- GET `/api/sessions/current`
  - Request parameter: None.
  - Request body: None.
  - Response: `200 OK` (success) or `401 Unauthenticated user`.
  - Response body: user info if logged in.
  ```
  {
    "id": 1,
    "username": "manager"}
  }
  ```

- DELETE `/sessions/current`
  - Request parameter: None.
  - Request body: None.
  - Response: `200 OK` (success).
  - Response body: None.  


- GET `/api/clients`
  - Request parameter: None.
  - Request body: None.
  - Response: `200 OK` (success) or `401 Unauthenticated user`.
  - Response body: clients list if logged in.
  ```
  [
    {
        "id": 1,
        "name": "Nino",
        "surname": "Frassica"
    },
    {
        "id": 2,
        "name": "Gigi",
        "surname": "Riva"
    },
  ]
  ```

  - GET `/api/clients/{id}`
  - Request parameter: clientID.
  - Request body: None.
  - Response: `200 OK` (success) or `401 Unauthenticated user` or `404 Not Found`.
  - Response body: client info if logged in.
  ```
  {
    "id": 1,
    "name": "Nino",
    "surname": "Frassica",
    "wallet": 689,
    "basket": "{\"milk\":3,\"egg\":2}",
    "email": "nino@gmail.com"
  }
  ```


- POST `/api/orders/`
  - Request parameter: None.
  - Request body: An object representing the order (Content-Type: `application/json`).
  ``` 
  {
      "products":{
          "Flour":2,
          "Eggs":2
       },
       "amount":23
  }
  ```
  - Response: `200 OK` (success) or `401 Unauthenticated user`.
  - Response body: `True` or `False`


- GET `/api/products`
  - Request parameter: None.
  - Request body: None.
  - Response: `200 OK` (success) or `401 Unauthenticated user`.
  - Response body: products list if logged in.
  ```
  [
    {
        "id": 1,
        "name": "Flour",
        "quantity": 1,
        "unit": "kg",
        "farmer": 1,
        "farmerName": "FattoriaBella",
        "price": 4.5
    },
    {
        "id": 2,
        "name": "Eggs",
        "quantity": 2,
        "unit": "pieces",
        "farmer": 1,
        "farmerName": "FattoriaBella",
        "price": 7
    }
  ]
  ```
- GET `/api/orders`
  - Request parameter: None.
  - Request body: None.
  - Response: `200 OK` (success) or `401 Unauthenticated user`.
  - Response body: orders list if logged in.
  ```
  [
    {
        "id": 1,
        "userID": 1,
        "products": "{\"milk\":2,\"eggs\":1}",
        "address": "via roma 24",
        "date": "2021-01-12",
        "time": "08:12",
        "amount": 12,
        "conf": 1,
        "fulfilled": 1
    },
    ...
  ]
  ```
- GET `/api/orders/{id}`
  - Request parameter: userID.
  - Request body: None.
  - Response: `200 OK` (success) or `401 Unauthenticated user`.
  - Response body: orders list of userdID if logged in.
  ```
  [
    {
        "id": 1,
        "userID": 1,
        "products": "{\"milk\":2,\"eggs\":1}",
        "address": "via roma 24",
        "date": "2021-01-12",
        "time": "08:12",
        "amount": 12,
        "conf": 1,
        "fulfilled": 1
    }
  ]
  ```

- PUT `/api/orders/{id}`
  - Request parameter: userID.
  - Request body: 
  ```
  [
    {
        "fulfilled": 1
    }
  ]
  ```
  - Response: `200 OK` (success) or `401 Unauthenticated user`.
  - Response body: `True` or `False`.
 

- POST `/api/addNewUser`
  - Request parameter: None.
  - Request body: An object representing the user (Content-Type: `application/json`).
  ``` 
  {
    "name": "Mario",
    "surname": "Rossi",
    "password": "password",
    "email": "mariorossi@gmail.com",
    "phoneNumber": "3333333333", 
    "city": "Torino", 
    "address": "Via X, 5", 
    "country": "Italy",
    "role": "customer"
  }
  ```
  - Response: `200 OK` (success) or `500 Internal server error`.
  - Response body: user id if everything is ok.
  ```
  {
    "id": 1
  }
  ```
- POST `'/api/nextProducts'`
  - Request parameter: role, week.
  - Request body: None.
  ``` 
  {}
  ``` 
  - Response: `200 OK` (success) or `500 Internal server error`.
  - Response body: the list of the products available from the next week if logged in.
  ```
  [
    {
        "id": 1,
        "name": "Flour",
        "quantity": 1,
        "unit": "kg",
        "farmer": 1,
        "farmerName": "FattoriaBella",
        "price": 4.5,
        "availability": "2021-12-03"
    },
    {
        "id": 2,
        "name": "Eggs",
        "quantity": 2,
        "unit": "pieces",
        "farmer": 1,
        "farmerName": "FattoriaBella",
        "price": 7,
        "availability": "2021-12-15"
    }
  ]