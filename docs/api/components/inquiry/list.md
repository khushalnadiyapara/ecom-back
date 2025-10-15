[<- routes](./../../route.md#inquiry)

# Inquiry List

### URL : /api/pg/`:pgId`/inquiry

### Method : `GET`

---

### Description

will return the list of inquiries.

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
    "id": "String",
    "Name": "String",
    "phone": "String",
    "gender": "String",
    "sharing": "Number",
    "message": "String",
    "status": "String",
    "token": "Number"
  }
]
```

---
