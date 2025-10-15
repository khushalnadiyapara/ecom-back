[<- routes](./../../route.md#account)

# Register a new Account

### URL : `/api/account/register`

### Method : `POST`

---

### Description

This API will register a new account with the given details.

---

### Request

```json
"body": {
  "token": "String", // required
  "name": "String", // required
  "otp": "Number", // required
  "phone": "String", // required
  "password": "string" // required
}
```

---

### Response

### status : `200`

```json
"body": {
  "token": "String", // Auth token
  "user": {
    "accountId": "UUID",
    "ownerName": "String",
    "isRootUser": "Boolean"
  },
  "expiryInSeconds": "Number" // to expire the cookie
}
```

---
