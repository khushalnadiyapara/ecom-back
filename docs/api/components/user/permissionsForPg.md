[<- routes](./../../route.md#user)

# User Permissions For PG

### URL : /api/user/permission

### Method : `GET`

---

### Description

will return all the Permissions of the user for given PG.

---

### Request

```js
header: {
  Authorization: "String";
  // required (Token)
}

query: {
  pgId: "UUID"; // required
}
```

---

### Response

### status : `200`

```json
{
  "guest": {
    "read": true,
    "create": true,
    "update": true,
    "delete": true
  },
  "room": {
    "read": true,
    "create": true,
    "update": true,
    "delete": true
  },
  "inquiry": {
    "read": true,
    "create": true,
    "update": true,
    "delete": true
  }
}
```

---
