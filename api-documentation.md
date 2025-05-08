<a id="readme-top"></a>
<br />
v1

## Blog_api documentation

### Overview

This REST API provides CRUD (Create, Read, Update, Delete) operations with jsonwebtoken(JWT) authentication.

### Base URL

```
  http://localhost:3000
```

### Authentication

All API request require authentication using Bearer Token

### Authentication Headers

| Header Name   | Value          |              Description               |
| ------------- | :------------- | :------------------------------------: |
| Authorization | Bearer {token} | Replace the {token} with you API token |

---

## Getting Started

### Register an account

**Endpoint:** <table><tr><td>POST /register</td></tr></table>

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

**Endpoint:**<table><tr><td>POST /sign-in</td></tr></table>

### Request Body:

```
{
  "username": "your_username",
  "password": "your_password"
}
```

### Response: 200 OK

---

### get refresh token

note: used refresh token route if accesstoken is equals to "TokenExpiredError"

**Endpoint:**<table><tr><td>GET /refresh-token</td></tr></table>

### Response:

```
{
    "accessToken": "your_new_access_token"
}
```

---

### Log out

note: if log-out request succesfull the refresh token will be deleted in the cookies and the access token should also be delete through client

**Endpoint:**<table><tr><td>GET /log-out</td></tr></table>

### Response: 204 No Content

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

## API Endpoints

**Make sure you input the access token the authorization headers**

### POST

Create post

**Endpoint:**<table><tr><td>POST /v1/api/post</td></tr></table>

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

Create comment

**Endpoint:**<table><tr><td>POST /v1/api/comment/post/{postId}</td></tr></table>

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

Create child comment

**Endpoint:**<table><tr><td>POST /v1/api/comment/{commentId}</td></tr></table>

### Request Body:

```
{
  "content": "your_child_comment_content"
}
```

### Response:

```
{
  "success": true,
  "data": {
    "childComment": {
        "commentId": "UUID_type",
        "content": "you_child_comment_content",
        "createdAt": "2025-05-07T10:51:02.532Z",
        "updatedAt": "2025-05-07T10:51:02.532Z",
        "parentCommentId": "UUID_type",
        "postId": null,
        "authorId": "UUID_type"
    }
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

Save liked post

**Endpoint:**<table><tr><td>POST /v1/api/liked-post/post/{postId}</td></tr></table>

### Response:

```
{
  "success": true,
  "data": {
    "likedPost": {
      "likedId": "UUID_type",
      "likedAt": "2025-05-07T10:53:33.800Z",
      "postId": "UUID_type",
      "authorId": "UUID_type",
      "post": {
          "postId": "UUID_type",
          "title": "post_title",
          "content": "post_content",
          "createdAt": "2025-05-06T13:01:59.988Z",
          "updatedAt": "2025-05-06T13:01:59.988Z",
          "authorId": "UUID_type"
      }
    }
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### GET

Get all post

**Endpoint:**<table><tr><td>GET /v1/api/post</td></tr></table>

### Response:

```
{
    "sucess": true,
    "data": {
    "posts": [
      {
        "postId": "UUID_type",
        "title": "post_title",
        "content": "post_content",
        "createdAt": "2025-05-06T13:01:59.988Z",
        "updatedAt": "2025-05-06T13:01:59.988Z",
        "authorId": "UUID_type",
        "comment": [
            {
              "commentId": "UUID_type",
              "content": "comment_content",
              "createdAt": "2025-05-06T13:08:18.008Z",
              "updatedAt": "2025-05-06T13:08:18.008Z",
              "parentCommentId": null,
              "postId": "UUID_type",
              "authorId": "UUID_type",
              "childComment": [
                "child_comment_data"
              ]
            }
          ]
      },
      {
        "postId": "UUID_type",
        "title": "post_title",
        "content": "post_content",
        "createdAt": "2025-05-08T04:30:41.309Z",
        "updatedAt": "2025-05-08T04:30:41.309Z",
        "authorId": "UUID_type",
        "comment": [
          "comment_data"
        ]
      }
    ]
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

Get specific post

**Endpoint:**<table><tr><td>GET /v1/api/post/{postId}</td></tr></table>

### Response:

```
{
  "success": true,
  "data": {
    "post": {
      "postId": "UUID_type",
      "title": "post_title",
      "content": "post_content",
      "createdAt": "2025-05-06T13:01:59.988Z",
      "updatedAt": "2025-05-06T13:01:59.988Z",
      "authorId": "UUID_type",
      "comment":[
        "commentId": "UUID_type",
        "content": "comment_content",
        "createdAt": "2025-05-06T13:08:18.008Z",
        "updatedAt": "2025-05-06T13:08:18.008Z",
        "parentCommentId": null,
        "postId": "UUID_type",
        "authorId": "UUID_type",
        "childComment": [
          "child_comment_data"
        ]
      ]
    }
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

Get all comments

**Endpoint:**<table><tr><td>GET /v1/api/comment/post/{postId}</td></tr></table>

### Response:

```
{
    "success": true,
    "data": {
        "allComments": [
          {
            "commentId": "UUID_type",
            "content": "comment_content",
            "createdAt": "2025-05-06T13:08:18.008Z",
            "updatedAt": "2025-05-06T13:08:18.008Z",
            "parentCommentId": null,
            "postId": "UUID_type",
            "authorId": "UUID_type",
            "childComment": [
                  {
                    "commentId": "UUID_type",
                    "content": "child_comment_content",
                    "createdAt": "2025-05-06T13:40:40.460Z",
                    "updatedAt": "2025-05-06T13:40:40.460Z",
                    "parentCommentId": "UUID_type",
                    "postId": null,
                    "authorId": "UUID_type",
                    "childComment": []
                  },
              ]
          },
          {
            "commentId": "UUID_type",
            "content": "comment_content",
            "createdAt": "2025-05-08T04:37:12.954Z",
            "updatedAt": "2025-05-08T04:37:12.954Z",
            "parentCommentId": null,
            "postId": "UUID_type",
            "authorId": "UUID_type",
            "childComment": []
          }
      ]
    }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

Get child comments

**Endpoint:**<table><tr><td>GET /v1/api/liked_post</td></tr></table>

### Response:

```
{
    "success": true,
    "data": {
      "allLikedPost": [
        {
          "likedId": "UUID_type",
          "likedAt": "2025-05-06T13:13:00.961Z",
          "postId": "UUID_type",
          "authorId": "UUID_type",
          "post": {
              "postId": "UUID_type",
              "title": "post_title",
              "content": "post_content",
              "createdAt": "2025-05-06T13:02:35.416Z",
              "updatedAt": "2025-05-06T13:02:35.416Z",
              "authorId": "UUID_type"
          }
        },
        {
          "likedId": "UUID_type",
          "likedAt": "2025-05-07T10:53:33.800Z",
          "postId": "UUID_type",
          "authorId": "UUID_type",
          "post": {
              "postId": "UUID_type",
              "title": "post_title",
              "content": "post_content",
              "createdAt": "2025-05-06T13:01:59.988Z",
              "updatedAt": "2025-05-06T13:01:59.988Z",
              "authorId": "UUID_type"
          }
        }
    ]
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

Get public post

**Endpoint:**<table><tr><td>GET /v1/api</td></tr></table>

### Response:

```
{
    "success": true,
    "data": {
      "posts": [
        {
          "postId": "UUID_type",
          "title": "post_title",
          "content": "post_content",
          "createdAt": "2025-05-06T13:01:59.988Z",
          "updatedAt": "2025-05-06T13:01:59.988Z",
          "authorId": "UUID_type"
        },
        {
          "postId": "UUID_type",
          "title": "post_title",
          "content": "post_content",
          "createdAt": "2025-05-06T13:02:35.416Z",
          "updatedAt": "2025-05-06T13:02:35.416Z",
          "authorId": "UUID_type"
        },
    ]
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### PUT

Update post

**Endpoint:**<table><tr><td>PUT /v1/api/post/{postId}</td></tr></table>

### Request

```
{
  "title": "new_post_title",
  "content": "new_post_content"
}
```

### Response:

```
{
    "sucess": true,
    "data": {
        "updatedPost": {
            "postId": "UUID_tyoe",
            "title": "new_post_title",
            "content": "new_post_content",
            "createdAt": "2025-05-08T04:30:41.309Z",
            "updatedAt": "2025-05-08T11:26:53.785Z",
            "authorId": "UUID_tyoe"
        }
    }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

Update comment

**Endpoint:**<table><tr><td>PUT /v1/api/comment/{commentId}</td></tr></table>

### Request

```
{
  "content": "new_comment_content"
}
```

### Response:

```
{
  "success": true,
  "data": {
    "updatedComment": {
        "commentId": "UUID_type",
        "content": "new_comment_content",
        "createdAt": "2025-05-06T13:08:18.008Z",
        "updatedAt": "2025-05-08T11:30:57.788Z",
        "parentCommentId": null,
        "postId": "UUID_type",
        "authorId": "UUID_type"
    }
  }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### DELETE

Delete post

**Endpoint:**<table><tr><td>DELETE /v1/api/post/{postId}</td></tr></table>

### Response: 204 No Content

---

Delete comment

**Endpoint:**<table><tr><td>DELETE /v1/api/comment/{commentId}</td></tr></table>

### Response: 204 No Content

---

Undo liked post

**Endpoint:**<table><tr><td>DELETE /v1/api/liked-post/{likedId}</td></tr></table>

### Response: 204 No Content

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>
