[<- routes](./../../route.md#account)

# Login to your Account

### URL : `/api/account/login`

### Method : `POST`

---

### Description

This API will Log in user to their account with the given details.

---

### Request

```json
"body": {
  "emailOrPhone": "String", //required
  "password": "String", // required
}
```

---

### Response

### status : `200`

```json
"body": {
  "token": "String", // Auth token
  "user": {
    "isRootUser": "Boolean",
    "accountId": "UUID",
    "email": "String",
    "ownerName": "String",
    "id": "UUID",
  },
  "expiryInSeconds": "Integer" // to expire the cookie
}
```

---
