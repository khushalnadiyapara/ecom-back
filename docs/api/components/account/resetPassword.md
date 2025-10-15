[<- routes](./../../route.md#account)

# Reset Account Password

### URL : `/api/account/reset-password`

### Method : `POST`

---

### Description

This API will reset the password of the account with the given new password.

---

### Request

```json
"body": {
  "token": "String", //required (magic link token)
  "password": "String", // required
}
```

---

### Response

status : `204`

- No content return

---
