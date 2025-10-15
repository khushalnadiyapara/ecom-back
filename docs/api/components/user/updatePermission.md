[<- routes](./../../route.md#user)

# Update User Permissions for PG

### URL : /api/user/`:userId`/permission

### Method : `POST`

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
  "permission": {
    "room": {
      "read": "Boolean",
      "create": "Boolean",
      "delete": "Boolean",
      "update": "Boolean"
    },
    "guest": {
      "read": "Boolean",
      "create": "Boolean",
      "delete": "Boolean",
      "update": "Boolean"
    },
    "inquiry": {
      "read": "Boolean",
      "create": "Boolean",
      "delete": "Boolean",
      "update": "Boolean"
    }
  }
}
```

---

### Response

### status : `204` : Permissions updated successfully but no content to return.

---
