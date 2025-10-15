[<- routes](./../../route.md#user)

# User Delete

### URL : `/api/user/` `:userId`

### Method : `DELETE`

---

### Description

will delete the user with the given id.

> Note: only for root user.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
```

---

### Response

### status : `204`

- Operation successful, but no content return.

---
