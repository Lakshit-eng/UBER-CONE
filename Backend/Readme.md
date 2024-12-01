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
