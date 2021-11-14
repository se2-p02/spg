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
- Route `/employee/clients/:id`: display the informations of the client with client id = {id}
- Route `/employee/products`: display the list of available products
- Route `/employee/form` : shows the form used by the employee to register the users
  
## Database Tables

- Table `users` - contains **id name username email wallet basket hash**
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


<br></br>
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
        "quantity": -2,
        "unit": "pieces",
        "farmer": 1,
        "farmerName": "FattoriaBella",
        "price": 7
    }
  ]
  ```
