[<- routes](./../../route.md#guest)

# Guest details By Id

### URL : /api/access/guest

### Method : `GET`

---

### Description

will return the guest details by id.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"query":{
  "token": "String" // required (Token)
}
```

---

### Response

### status : `200`

```json
"body": {
  "name": "String",
  "email": "string",
  "phone": "string",
  "gender": "string",
  "emergencyPhone": "string",
  "address": "string",
  "documents": [
    {
        "id": "String",
        "name": "String",
        "image": "String"
    }
  ]
}
```

---
