[<- routes](./../../route.md#pg)

# PG Update Profile

### URL : api/pg/`:pgId`

### Method : `PUT`

---

### Description

will update the profile of the PG.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "name": "String",
  "type": "String",
  "address": "String",
  "email": "String",
  "phone": "String",
  "cityId": "UUID",
  "meta": "Object"
}
```

---

### Response

### status : `204`

- Operation successful, but no content return.

---
