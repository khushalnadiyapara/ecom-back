[<- routes](./../../route.md#user)

# User List

### URL : `/api/user`

### Method : `GET`

---

### Description

will return the list of users.

> `query.pgId` is optional. if provided will return the list of users for that Pg.

---

### Request

```js
header: {
  Authorization: "String";
  // required (Token)
}

query: {
  pgId: "UUID";
  // optional
}
```

---

### Response

### status : `200`

```json
[
  {
    "id": "UUID",
    "pgId": "UUID",
    "username": "String",
    "phone": "String"
  }
]
```

---
