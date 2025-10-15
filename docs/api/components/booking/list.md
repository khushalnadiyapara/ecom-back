[<- routes](./../../route.md#Booking)

# Booking List of PG

### URL : /api/pg/`:pgId`/Booking

### Method : `GET`

---

### Description

return the list of Bookings in the PG.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
"query": {
  "isDeleted": "Boolean", // optional (default: false) (true: return deleted Bookings)
}
```

---

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
  "checkOutDate": "String",
  "room": {
    "id": "string",
    "name": "string",
    "capacity": "number"
  }
}
```

---
