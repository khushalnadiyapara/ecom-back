[<- routes](./../../route.md#inquiry)

# Create Inquiry

### URL : /api/pg/`:pgId`/inquiry

### Method : `POST`

---

### Description

Create a new inquiry.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "name": "String", // required
  "phone": "String",// required
  "gender": "String",  // required 'male', 'female', 'both'
  "sharing": "Number",
  "message": "String",
  "token": "Number"
}
```

---

### Response

### status : `200`

```json
{
  "Name": "String",
  "phone": "String",
  "gender": "String",
  "sharing": "Number",
  "message": "String",
  "token": "Number"
}
```

---
