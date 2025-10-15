[<- routes](./../../route.md#guest)

# Update Guest

### URL : /api/pg/`:pgId`/guest/`:guestId`

### Method : `PUT`

---

### Description

Update the guest details by id.

---

### Request

```json

"header": {
  "Authorization" : "String" // required (Token)
}

// the number of files you provide will be updated.
// all fields are not required, at list one field is required
"body": {
    "name": "string",
    "phone": "string", // length must be 10
    "email": "string",
    "gender": "string", // ("male" , "female")
    "rent": "number", // min 0
    "deposit": "number", // min 0
    "roomId": "string",
    "checkInDate": "string",
    "sharing": "number",
    "emergencyPhone": "string",
    "address": "string",
    "checkOutDate": "string",
    "info": "string",
    "type":"string",
    "dateOfNotice": "String",
    "checkOutReading":"number" // min 0
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
