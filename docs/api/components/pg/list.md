[<- routes](./../../route.md#pg)

# PG List

### URL : `/api/pg`

### Method : `GET`

---

### Description

will return the list of PGs.

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
[
  {
    "id": "string",
    "name": "string",
    "code": "string",
    "type": "string",
    "address": "string",
    "phone": "string"
  }
]
```

---
