# se2021-02--SPG

## Installation Guide
 To run it with docker:
 * git clone https://github.com/se2-p02/spg.git
 * docker-compose up

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

## Accounts
 | Name     | Role              | Email                      | Password |
 | -------- | ----------------- | -------------------------- | -------- |
 | Nino     | Employee          | admin@admin.admin          | admin    |
 | Gigi     | Customer          | client@client.client       | client   |
 | Paolo    | Customer          | client1@client1.client1    | client1  |
 | farmer   | Farmer            | farmer@farmer.farmer       | farmer   |
 | farmer1  | Farmer            | farmer1@farmer1.farmer1    | farmer1  |
 | farmer2  | Farmer            | farmer2@farmer2.farmer2    | farmer2  |
 | wmanager | Warehouse Manager | wmanager@wmanager.wmanager | wmanager |
 | wworker  | Warehouse Worker  | wworker@wworker.wworker    | wworker  |
 | manager  | Manager           | manager@manager.manager    | manager  |

## Data in the DB
Products inserted in the DB can be viewed from 22 to 28 November 2021.

## React Client Application Routes

- Route `/`: main page with links to main page
- Route `/login`: login form for that in future will redirect to the user page
- Route `/signup`: signup page for register an user
- Route `/employee`: display the possible actions available for an employee
- Route `/employee/clients`: display a the list of registered clients
- Route `/employee/clients/:id`: display the informations and orders of the client with client id = {id}
- Route `/employee/products`: display the list of available products
- Route `/employee/orders`: display the list of all orders
- Route `/employee/form` : shows the form used by the employee to register the users
- Route `/farmer/` : display the possible actions available for a farmer
- Route `/farmer/profile`: display the informations of the farmer
- Route `/farmer/products`: display the list of available products
- Route `/employee/myProducts`: display the list of next week's products of the farmer
- Route `/client/` : display the possible actions available for a client
- Route `/client/profile`: display the informations of the client
- Route `/client/products`: display the list of available products
- Route `/client/orders`: display the list of all orders of a client
- Router `/wworker`: display the page of the warehouse worker
- Router `/wworker/notAvailableOrders`: display the main page of the warehouse worker
- Router `/wmanager/deliveries`: display the delivery info for the warehouse manager
- Router `/wmanager/availableOrders`: display the page of the warehouse worker for seing the confirmed orders 
- Router `/manager/unretrievedOrders`: display the page of the statistics

  
## Database Tables

- Table `users` - contains **id name username email wallet basket hash email phoneNumber city address country role farmedId**
- Table `products` - contains **id name quantity unit farmer confirmed delivered price availability filter image**
- Table `orders` - contains **id userID products address date time amount confPreparation fulfilled paid status**
- Table `farmers` - contains **id name confirmed**
- Table `clock` - contains **serverTime**
- Table `telegram` - contains **name token**
- Table `telegramSubscribers` - contains **telegramId**
- Table `F_delieveres` - contains **id productUd farmerId quantity orderId**

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
- GET `'/api/nextProducts'`
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

- POST `/api/products`
  - Request parameter: None.
  - Request body: An object representing the product (Content-Type: `application/json`).
  ``` 
  {
    name: "Sticks",
    quantity: "4",
    unit: "pcs", 
    price: "2",
    filter: "Home and Garden"
  }
  ```
  - Response: `200 OK` (success) or `500 Internal server error`.
  - Response body: true or false.

- PUT `/api/products/:id`
  - Request parameter: the id of the product to modify.
  - Request body: An object representing the product (Content-Type: `application/json`).
  ``` 
  {
    product: {
      name: "Sticks",
      quantity: "4",
      unit: "pcs", 
      price: "2",
      filter: "Home and Garden"
    },
    action: {
      update: "true"
    }
  }

  ```
  - Response: `200 OK` (success) or `500 Internal server error`.
  - Response body: true or false.

  
- DELETE `/api/products/:id`
  - Request parameter: the id of the product to delete.
  - Request body: None.
  - Response: `200 OK` (success).
  - Response body: None.  

- GET `/api/deliverableProducts`
  - Request parameter: None.
  - Request body: None.
  - Response: `200 OK` (success).
  - Response body: deliverable products list.
  ```
  {
    "TerraGrossa": [
        {
            "id": 2,
            "quantity": 2,
            "farmer": 3,
            "status": 2,
            "name": "Eggs",
            "orderId": 1
        }
    ],
    "FattoriaBella": [
        {
            "id": 7,
            "quantity": 1,
            "farmer": 7,
            "status": 2,
            "name": "Cheese",
            "orderId": 1
        }
    ]
  }
  ```
- GET `/api/deliveries`
  - Request parameter: None.
  - Request body: None.
  - Response: `200 OK` (success).
  - Response body: deliveries list.
  ```
  [
    {
        "id": 5,
        "product": {
            "id": 2,
            "name": "Eggs",
            "farmer": 7
        },
        "farmer": {
            "id": 3,
            "name": "TerraGrossa"
        },
        "quantity": 2,
        "orderId": 1
    },
    ...
  ]
  ```

- POST `/api/deliveries`
  - Request parameter: None.
  - Request body: An object representing the delivery (Content-Type: `application/json`).
  ``` 
  { 
    id: 2,
    quantity: 2,
    farmer: 3,
    status: 2,
    name: 'Eggs',
    orderId: 1
  }
  ```
  - Response: `200 OK` (success) or `500 Internal server error`.
  - Response body: true or false.
  
- POST `/api/confirmOrderForPickup`
  - Request parameter: None.
  - Request body: An object representing the order (Content-Type: `application/json`).
  ``` 
  { 
      id: 5,
      products: [{
        id: 1,
        name: "MilkTest",
        quantity: 7,
        unit: "l",
        price: 1.5,
        filter: "Dairy and Eggs"
      }],
      date: "2021-12-12",
      confPreparation: 0,
      fullfilled: false,
      status: "available",
      time: "12:12",
      amount: 2,
      address: "Via X",
      userID: 2,
      paid: 0
    }
  ```
  - Response: `200 OK` (success) or `500 Internal server error`.
  - Response body: true if the operation is successful.
  
- GET `/api/orderswithstatus/:status`
  - Request parameter: status.
  - Request body: None.
  - Response: `200 OK` (success) or `404 Not found`.
  - Response body: the list of orders with the passed status.
  ```
  [
    { 
      id: 5,
      products: [{
        id: 1,
        name: "MilkTest",
        quantity: 7,
        unit: "l",
        price: 1.5,
        filter: "Dairy and Eggs"
      }],
      date: "2021-12-12",
      confPreparation: 0,
      fullfilled: false,
      status: "available",    //  /api/orderswithstatus/available
      time: "12:12",
      amount: 2,
      address: "Via X",
      userID: 2,
      paid: 0
    }
    ...
  ]
  ```
