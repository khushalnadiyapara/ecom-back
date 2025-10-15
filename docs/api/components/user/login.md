[<- routes](./../../route.md#user)

# User Login

### URL : `/api/user/login` `:accountId`

### Method : `POST`

---

### Description

Login a user.

---

### Request

```json
"body": {
  "usernameOrPhone": "String",
  "password": "String",
}
```

---

### Response

### status : `200`

```json
{
  "token": "String", // Authorization Token
  "user": {
    "id": "UUID",
    "username": "String",
    "accountId": "UUID",
    "phone": "String",
    "isRootUser": "Boolean"
  },
  "expiryInSeconds": "Integer" // to expire the cookie
}
```

---
