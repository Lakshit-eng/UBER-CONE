# API Documentation: `/users/register`

## Endpoint
`POST /users/register`

## Description
This endpoint is used to register a new user in the system. It validates the user's input, hashes their password, and stores the user information in the database. Upon successful registration, an authentication token is generated and returned along with the user details.

---

## Request Body Requirements

### Fields
- **`fullname.firstname` (required)**
  - Type: `String`
  - Minimum Length: 3 characters
  - Description: The first name of the user.
  
- **`fullname.lastname` (optional)**
  - Type: `String`
  - Minimum Length: 3 characters
  - Description: The last name of the user.

- **`email` (required)**
  - Type: `String`
  - Validation: Must be a valid email address.
  - Description: The email address of the user.

- **`password` (required)**
  - Type: `String`
  - Minimum Length: 6 characters
  - Description: The password for the user account.

### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
Response
Success Response
Status Code: 201 Created
Body:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "_id": "63f9c82a2c4b7e001e...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
Error Responses
Validation Error

Status Code: 400 Bad Request
Body:
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
Missing Required Fields

Status Code: 400 Bad Request
Body:
{
  "error": "All fields are required"
}
Notes
Passwords are hashed before storing them in the database.
The token in the response can be used for authenticating subsequent requests.
Ensure to provide valid and correctly formatted data to avoid validation errors.
Dependencies
Validation: This endpoint uses express-validator for input validation.
Password Hashing: Uses bcrypt for hashing user passwords.
Token Generation: Uses jsonwebtoken for creating the authentication token.

