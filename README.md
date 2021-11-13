# Welcome to SPG

## Installation Guide

## React Client Application Routes

- Route `/`: main page

## Database Tables

- Table `farmer` - contains id name confirmed
- Table `orders` - contains id userID products address date time amount confPreparation
- Table `products` - contains id name quantity unit farmer confirmed delivered price
- Table `users` - contains id name surname wallet basket hash email

## API Server

- POST `/api/addNewUser`
  - Request parameter: None.
  - Request body: An object representing the user (Content-Type: `application/json`).
  ``` 
  {
    "name": "Mario",
    "surname": "Rossi",
    "password": "password",
    "email": "mariorossi@gmail.com"
  }
  ```
  - Response: `200 OK` (success) or `500 Internal server error`.
  - Response body: user id if everything is ok.
  ```
  {
    "id": 1
  }
  ```
