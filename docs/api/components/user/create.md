[<- routes](./../../route.md#user)

# User Create

### URL : `/api/user`

### Method : `POST`

---

### Description

Create a new user.

> Note: only for root user.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "username": "String",
  "password": "String",
  "phone": "String",
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

### status : `200`

```json
{
  "id": "UUID",
  "accountId": "UUID",
  "username": "String",
  "phone": "String",
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
