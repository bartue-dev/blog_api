v1

## Blog_api documentation

### Overview

This REST API provides CRUD (Create, Read, Update, Delete) operations with jsonwebtoken(JWT) authentication.

### Base URL

```
  http://localhost:3000/v1
```

### Authentication

All API request require authentication using Bearer Token

### Authentication Headers

| Header Name   | Value          |           Description align            |
| ------------- | :------------- | :------------------------------------: |
| Authorization | Bearer {token} | Replace the {token} with you API token |

---

## Getting Started

### Register an account

**Endpoint:** <table><tr><td>POST/register</td></tr></table>

### Request Body:

```
{
  "username": "your_username",
  "password": "your_password",
  "email": "your_email@test.com"
}
```

---

### Sign in to get an Authentication Token

**Endpoint:**<table><tr><td>POST/sign-in</td></tr></table>

### Request Body:

```
{
  "username": "your_username",
  "password": "your_password"
}
```

---

## Http status codes

Standard HTTP status codes. Indicates the success or failure of the requests.

| Status Code | Description                                                          |
| ----------- | :------------------------------------------------------------------- |
| 200         | Ok - the request was successful                                      |
| 201         | Created - a data was successfully created                            |
| 204         | No Content - a data was successfully deleted                         |
| 400         | Bad request - client error                                           |
| 401         | Unauthorized - authentication failed or authentication token expires |
| 403         | Forbidden - authentication failed or authentication token expires    |
| 404         | Not found - Data not found                                           |

### Error response Format

```
  "status": "status_code",
  "message": "error_message",
  "error": {
    "additional_error_details"
  }
```

### API Endpoints

### POST

Create post

**Endpoint:**<table><tr><td>POST /api/v1/post</td></tr></table>

### Request Body:

```
{
  "title": "your_post_title",
  "content": "your_post_content"
}
```

### Response:

```
{
  "success": true,
  "data": {
    "post": {
      "postId": "UUID_type",
      "title": "your_post_title",
      "content": "your_post_content",
      "createdAt": "2025-05-06T12:20:45.196Z",
      "updatedAt": "2025-05-06T12:20:45.196Z",
      "authorId": "UUID_type"
    }
  }
}
```

---

Create comment

**Endpoint:**<table><tr><td>POST /api/v1/comment/post/{postId}</td></tr></table>

### Request Body:

```
{
  "content": "your_comment_content"
}
```

### Response:

```
{
  "success": true,
  "data": {
    "post": {
      "postId": "UUID_type",
      "title": "your_post_title",
      "content": "your_post_content",
      "createdAt": "2025-05-06T12:20:45.196Z",
      "updatedAt": "2025-05-06T12:20:45.196Z",
      "authorId": "UUID_type"
    }
  }
}
```

---
