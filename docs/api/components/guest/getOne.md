[<- routes](./../../route.md#guest)

# Guest details By Id

### URL : /api/pg/`:pgId`/guest/`:guestId`

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
  "rent": "number",
  "checkInReading": "number",
  "deposit": "number",
  "checkInDate": "string",
  "sharing": "number",
  "emergencyPhone": "string",
  "address": "string",
  "checkOutDate": "string",
  "info": "string",
  "type":"string",
  "dateOfNotice": "String",
   "room": {
        "id": "UUID",
        "name": "String",
        "capacity": "Number",
        "tags": [
            "String"
        ],
        "info": "String",
        "occupied": "Number",
        "booked":"Number"
    },
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
