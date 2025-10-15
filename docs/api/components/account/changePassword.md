[<- routes](./../../route.md#account)

# Change the password of Account

### URL : `/api/account/change-password`

### Method : `POST`

---

### Description

This API will change the password of the account with the given new password.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "password": "String", //required
  "newPassword": "String", // required
}
```

---

### Response

status : `204`

- No content return

---
