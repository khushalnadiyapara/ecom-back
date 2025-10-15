[<- routes](./../../route.md#account)

# Forgot Password

### URL : `/api/account/forgot-password`

### Method : `POST`

---

### Description

This API will send the magic link to User's email with provided redirect URL.

---

### Request

```json
"body": {
  "emailOrPhone": "String", //required
  "redirectUrl": "String", // required (URL to redirect after OTP verification)
}
```

---

### Response

### status : `204`

- No content return

---
