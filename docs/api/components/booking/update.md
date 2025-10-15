[<- routes](./../../route.md#booking)

# Update booking

### URL : /api/pg/`:pgId`/booking/`:bookingId`

### Method : `PUT`

---

### Description

Update the booking details by id.

---

### Request

```json

"header": {
  "Authorization" : "String" // required (Token)
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

---

### Response

### status : `204`

- not content return.

### status : `404`

```json
// if you want to update room and it's not available
{ "code": "resource_not_found", "message": "Room not found" }
```
