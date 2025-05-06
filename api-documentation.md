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

**Endpoint:** <table><tr><td>POST/register.</td></tr></table>

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

**Endpoinst:**<table><tr><td>POST/sign-in.</td></tr></table>

### Request Body:

```
{
  "username": "your_username",
  "password": "your_password"
}
```
