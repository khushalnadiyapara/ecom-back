[<- routes](./../../route.md#pg)

# Get PG Profile

### URL : api/pg/`:pgId`

### Method : `GET`

---

### Description

will return the profile of the PG.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
```

---

### Response

### status : `200`

```json
{
  "id": "UUID",
  "name": "String",
  "code": "String",
  "type": "String",
  "address": "String",
  "email": "String",
  "phone": "String",
  "meta": "Object",
  "city": {
    "id": "UUID",
    "name": "String"
  },
  "state": {
    "id": "UUID",
    "name": "String"
  },
  "country": {
    "id": "UUID",
    "name": "String"
  }
}
```

---
