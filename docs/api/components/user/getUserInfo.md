[<- routes](./../../route.md#user)

# User Info

### URL : /api/user/`:userId`

### Method : `GET`

---

### Description

will return the Information of the user.

---

### Request

```js
header: {
  Authorization: "String";
  // required (Token)
}
```

---

### Response

### status : `200`

```json
{
  "id": "UUID",
  "username": "String",
  "phone": "String",
  "createdAt": "Date",
  "pgs": [
    {
      "id": "UUID",
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
  ]
}
```

---
