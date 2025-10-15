[<- routes](./../../route.md#pg)

# Create PG

### URL : `/api/pg`

### Method : `POST`

---

### Description

Create a new PG.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
 "name": "string",   // {required}  min = name.length(2) , max= name.length(100)
  "type": "string", // {required} valid only ('boys','girls', 'both')
  "phone": "string", // {required} length 10
  "email": "user@example.com", // {required}
  "address": "string", // {required} min = address.length(10) , max= address.length(1000)
  "cityId": "string", // {required} uuid
  "code": "string"
}
```

---

### Response

### status : `200`

```json
{
  "id": "string",
  "name": "string",
  "type": "string",
  "phone": "string",
  "email": "user@example.com",
  "address": "string",
  "cityId": "string",
  "code": "string"
}
```

---
