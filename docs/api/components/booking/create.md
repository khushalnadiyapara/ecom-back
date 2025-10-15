[<- routes](./../../route.md#booking)

# Create a new Booking

### URL : /api/pg/`:pgId`/booking

### Method : `POST`

---

### Description

will create a new Booking.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"query": {
  "inquiryId": "UUID", // optional (if inquiryId , status of this inquiryId will update to `booked`)
}

"body": {
  "name": "String", // required
  "email": "String",
  "phone": "String", // required | length must be 10
  "gender": "String", // required ("male" , "female")
  "rent": "number", // required min 0
  "tokenAmount": "number", //  min 0
  "roomId": "String",
  "checkInDate": "String", // required
  "sharing": "number", // required
  "checkOutDate": "String",
}
```

### Response

### status : `200`

```json
{
  "id": "String",
  "pgId": "String",
  "name": "String",
  "email": "String",
  "phone": "String",
  "gender": "String",
  "sharing": "Number",
  "rent": "Number",
  "checkInDate": "String",
  "tokenAmount": "Number",
  "roomId": "String",
  "checkOutDate": "String"
}
```

---
