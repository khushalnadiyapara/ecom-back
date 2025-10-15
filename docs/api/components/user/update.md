[<- routes](./../../route.md#user)

# User Update

### URL : `/api/user/` `:userId`

### Method : `PUT`

---

### Description

Update the user of given id.

> Note: only for root user.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "username": "String", // required
  "password": "String",
  "phone": "String" // required
}
```

---

### Response

### status : `200`

```json
{
  "id": "UUID",
  "username": "String",
  "phone": "String"
}
```

---
