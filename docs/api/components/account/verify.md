[<- routes](./../../route.md#account)

# Verify your Email with `OTP`

### URL : `/api/account/verify-email`

### Method : `POST`

---

### Description

On the API call server will check weather the account with the given email or phone exists or not if not it will return send the OTP to the given email address.

---

### Request

```json
"body": {
  "email": "String", // required
  "phone": "String" // required
}
```

---

### Response

### status : `200`

```json
"body": {
  "token": "String",
}
```

---
