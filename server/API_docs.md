# Individual Project (WibuLovers ^_^)

# Endpoints

_Authentication_

- **POST /login**
- **POST /google-login**
- **POST /register**

_Anime_

- **GET /anime**
- **GET /anime/:id**
- **GET /payment**
- **PATCH /upgrade**
- **GET /score**

_Favorite_

- **GET /favorite**
- **POST /favorite/:animeId**
- **PUT /favorite/:animeId**
- **DELETE /favorite/:animeId**

---

# POST /login

_Information_

This endpoint is used for user authentication, providing an access token upon successful login.

> ### **Request**

- **Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

## Response

Response: (200 - OK)

```json
{
  "message": "Success Login",
  "token": "string",
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "password": "string",
    "status": "string",
    "createdAt": "date",
    "updatedAt": "date"
  },
  "status": "string"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Email is required"
}
"OR"
{
  "message": "Password is required"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Email/Password"
}
```

---

---

# POST /google-login

_Information_

This endpoint is used for user authentication, providing an access token upon successful login with google.

> ### **Request**

- **Body:**

```json
{
  "googleToken": "string"
}
```

## Response

Response: (200 - OK)

```json
{
  "message": "Success Logged in as (email)"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

---

# POST /register

_Information_

This endpoint is used to register a new user.

> ### **Request**

- **Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response: (201 - Created)

```json
{
  "message": "string",
  "user": {
    "status": "string",
    "id": "integer",
    "username": "string",
    "email": "string",
    "password": "string",
    "updatedAt": "date",
    "createdAt": "date"
  }
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Username cannot be empty"
}
```

```json
{
  "message": "Email cannot be empty"
}
"OR"
{
  "message": "Must be an email format"
}
"OR"
{
  "message": "Email already registered"
}
```

```json
{
  "message": "Password cannot be empty"
}
```

Response: (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

---

# GET /anime

_Information_

This endpoint retrieves mountain list

> ### **Request**

- **Header:**
  - `Authentication Bearer (token)`

## Response

Response: (200 - OK)

```json
{
  "page": "number",
  "data": [
    {
      "id": "number",
      "title": "string",
      "imgUrl": "number",
      "episode": "integer",
      "watchEps": "integer",
      "rating": "integer",
      "ScoreId": "integer",
      "synopsis": "string",
      "genre": "array",
      "trailer": "string",
      "status": "string",
      "createdAt": "date",
      "updatedAt": "date",
    },
    ...
  ],
  "totalData": "number",
  "totalPage": "number",
  "dataPerPage": "number"
}
```

---

# GET /anime/:id

_Information_

This endpoint retrieves a specific mountain by ID.

> ### **Request**

- **Header:**
  - `Authentication Bearer (token)`

## Response

Response: (200 - OK)

```json
{
      "id": "number",
      "title": "string",
      "imgUrl": "number",
      "episode": "integer",
      "watchEps": "integer",
      "rating": "integer",
      "ScoreId": "integer",
      "synopsis": "string",
      "genre": "array",
      "trailer": "string",
      "status": "string",
      "createdAt": "date",
      "updatedAt": "date",
      "Score":{
        "id": "integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date",
      }
    },
```

---

# GET /score

_Information_

This endpoint retrieves all booking

> ### **Request**

- **Header:**
  - `Authentication Bearer (token)`

## Response

Response: (200 - OK)

```json
[
    {
        "id": "integer",
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    ...
]
```

---

# GET /favorite

_Information_

This endpoint post booking by id

> ### **Request**

- **Header:**
  - `Authentication Bearer (token)`

## Response

Response: (200 - OK)

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "AnimeId": "integer",
    "createdAt": "date",
    "updatedAt": "date",
    "Anime": {
      "id": "number",
      "title": "string",
      "imgUrl": "number",
      "episode": "integer",
      "watchEps": "integer",
      "rating": "integer",
      "ScoreId": "integer",
      "synopsis": "string",
      "genre": "array",
      "trailer": "string",
      "status": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ...
]
```

---

# POST /favorite/:animeId

_Information_

This endpoint add anime to favorite list

> ### **Request**

- **Header:**
  - `Authentication Bearer (token)`
  - `Authorization Premium Only`

## Response

Response: (201 - CREATED)

```json
{
    "string Added to Favorite List"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "You Must Upgrade Premium"
}
```

Response: (404 - Not Found)

```json
{
  "message": "Error Data Not Found"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "This Anime Have Been Added to Your Favorite"
}
OR
{
    "message": "Favorite with id (animeId) not found"
}
```

---

# DELETE /favorite/:animeId

_Information:_

- To delete favorite list by id

> ### **Request**

- **Header:**
  - `Authentication Bearer (token)`
  - `Authorization Premium Only`

## Responses

Response: (200 - OK)

```json
{
  "message": "Successfully Removed From My Favorite"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "You Must Upgrade Premium"
}
```

Response: (404 - Not Found)

```json
{
  "message": "This Anime Have Been Added to Your Favorite"
}
OR
{
    "message": "Favorite with id (animeId) not found"
}
```

---

# PUT /favorite/:animeId

_Information_

This endpoint to update status and score for thhe anime

> ### **Request**

- **Header:**

  - `Authentication Bearer (token)`
  - `Authorization Premium Only`

  > ### **Request**

- **Body:**

```json
{
  "ScoreId": "integer",
  "status": "string"
}
```

## Response

Response: (200 - OK)

```json
{
  "id": "number",
  "title": "string",
  "imgUrl": "number",
  "episode": "integer",
  "watchEps": "integer",
  "rating": "integer",
  "ScoreId": "integer",
  "synopsis": "string",
  "genre": "array",
  "trailer": "string",
  "status": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

Response: (403 - Forbidden)

```json
{
  "message": "You Must Upgrade Premium"
}
```

Response: (404 - Not Found)

```json
{
  "message": "This Anime Have Been Added to Your Favorite"
}
OR
{
    "message": "Favorite with id (animeId) not found"
}
```

---

---

# GET /payment

_Information_

This endpoint create transaction and the order

> ### **Request**

## Response

Response: (200 - OK)

```json
"( transactionToken <string> )( OrderId <integer> )"
```

---

---

# PATCH /upgrade

_Information_

This endpoint post event by id

> ### **Request**

## Response

Response: (200 - OK)

```json
{
    "message": "Upgrade Success"
}
```

Response: (404 - Not Found)

```json
{
  "message": "Error Order Not Found"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "You Are Already Premium"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Order Already Paid"
}
```

Response: (400 - Bad Request)

```json
{
  "message": "Upgrade Failed, Please Contact Admin"
}
```

---

&nbsp;

# Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
