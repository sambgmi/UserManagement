# User Management API Documentation

Base URL: `http://localhost:5000/api`

## Table of Contents
1. [Get All Users](#1-get-all-users)
2. [Get Single User](#2-get-single-user)
3. [Create User](#3-create-user)
4. [Update User](#4-update-user)
5. [Delete User](#5-delete-user)
6. [Data Models](#6-data-models)
7. [Error Handling](#7-error-handling)

## 1. Get All Users

Retrieves a list of all users.

```
GET /api/users
```

### Request
- Method: GET
- URL: http://localhost:5000/api/users
- Headers: None required

### Success Response

- Status Code: 200 OK
```json
[
    {
        "_id": "64f4c3e14b55d6e8573d7101",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "company": "Tech Corp",
        "address": {
            "street": "123 Main St",
            "city": "New York",
            "zip": "123456",
            "geo": {
                "lat": 40.7128,
                "lng": 74.0060
            }
        },
        "createdAt": "2025-09-03T14:23:45.123Z",
        "updatedAt": "2025-09-03T14:23:45.123Z"
    }
]
```

### Error Response
- Status Code: 500 Internal Server Error
```json
{
    "message": "Server Error"
}
```

## 2. Get Single User

Retrieves a specific user by ID.

```
GET /api/users/:id
```

### Request
- Method: GET
- URL: http://localhost:5000/api/users/64f4c3e14b55d6e8573d7101
- Parameters:
  - id: MongoDB ObjectId (required)

### Success Response
- Status Code: 200 OK
```json
{
    "_id": "64f4c3e14b55d6e8573d7101",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "company": "Tech Corp",
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zip": "123456",
        "geo": {
            "lat": 40.7128,
            "lng": 74.0060
        }
    },
    "createdAt": "2025-09-03T14:23:45.123Z",
    "updatedAt": "2025-09-03T14:23:45.123Z"
}
```

### Error Responses
- Status Code: 404 Not Found
```json
{
    "message": "User not found"
}
```

## 3. Create User

Creates a new user.

```
POST /api/users
```

### Request
- Method: POST
- URL: http://localhost:5000/api/users
- Headers: 
  - Content-Type: application/json
- Body:
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "company": "Tech Corp",
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zip": "123456",
        "geo": {
            "lat": 40.7128,
            "lng": 74.0060
        }
    }
}
```

### Success Response
- Status Code: 201 Created
```json
{
    "_id": "64f4c3e14b55d6e8573d7101",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "company": "Tech Corp",
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zip": "123456",
        "geo": {
            "lat": 40.7128,
            "lng": 74.0060
        }
    },
    "createdAt": "2025-09-03T14:23:45.123Z",
    "updatedAt": "2025-09-03T14:23:45.123Z"
}
```

### Error Responses
- Status Code: 400 Bad Request (Validation Error)
```json
{
    "message": "Name is required, Email is required, etc..."
}
```
- Status Code: 400 Bad Request (Duplicate Phone)
```json
{
    "message": "User with this phone number already exists"
}
```

## 4. Update User

Updates an existing user.

```
PUT /api/users/:id
```

### Request
- Method: PUT
- URL: http://localhost:5000/api/users/64f4c3e14b55d6e8573d7101
- Headers:
  - Content-Type: application/json
- Parameters:
  - id: MongoDB ObjectId (required)
- Body (all fields optional):
```json
{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "9876543210",
    "company": "New Corp",
    "address": {
        "street": "456 Park Ave",
        "city": "Los Angeles",
        "zip": "654321",
        "geo": {
            "lat": 34.0522,
            "lng": 74.0060
        }
    }
}
```

### Success Response
- Status Code: 200 OK
```json
{
    "_id": "64f4c3e14b55d6e8573d7101",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "phone": "9876543210",
    "company": "New Corp",
    "address": {
        "street": "456 Park Ave",
        "city": "Los Angeles",
        "zip": "654321",
        "geo": {
            "lat": 34.0522,
            "lng": 74.0060
        }
    },
    "createdAt": "2025-09-03T14:23:45.123Z",
    "updatedAt": "2025-09-03T14:25:12.345Z"
}
```

### Error Responses
- Status Code: 404 Not Found
```json
{
    "message": "User not found"
}
```
- Status Code: 400 Bad Request
```json
{
    "message": "Please enter a valid email address"
}
```

## 5. Delete User

Deletes a specific user.

```
DELETE /api/users/:id
```

### Request
- Method: DELETE
- URL: http://localhost:5000/api/users/64f4c3e14b55d6e8573d7101
- Parameters:
  - id: MongoDB ObjectId (required)

### Success Response
- Status Code: 200 OK
```json
{
    "message": "User removed"
}
```

### Error Response
- Status Code: 404 Not Found
```json
{
    "message": "User not found"
}
```

## 6. Data Models

### User Model
```typescript
{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: /^\+?[\d\s-]{10,}$/
    },
    company: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true,
            match: /^\d{6}$/
        },
        geo: {
            lat: {
                type: Number,
                required: true,
                min: 0,
                max: 90
            },
            lng: {
                type: Number,
                required: true,
                min: 0,
                max: 180
            }
        }
    }
}
```

## 7. Error Handling

### Validation Rules
- Name: Required string
- Email: Must be a valid email format
- Phone: Must be unique, minimum 10 digits
- Company: Required string
- Address:
  - Street: Required string
  - City: Required string
  - ZIP: Exactly 6 digits
  - Geo coordinates:
    - Latitude: Number between 0 and 90
    - Longitude: Number between 0 and 180

### Common Error Status Codes
- 400: Bad Request (Validation errors)
- 404: Not Found
- 500: Internal Server Error

### Sample Error Response
```json
{
    "message": "Error message here",
    "details": {
        "field": "Specific field error message"
    }
}
```
