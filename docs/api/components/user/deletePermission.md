[<- routes](./../../route.md#user)

# Delete User Permissions for PG

### URL : /api/user/`:userId`/permission

### Method : `DELETE`

---

### Description

allocate Pg to User.

> Note: only for root user.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
"body": {
  "pgId": "UUID",
}
```

---

### Response

### status : `204` : Permissions updated successfully but no content to return.

---
