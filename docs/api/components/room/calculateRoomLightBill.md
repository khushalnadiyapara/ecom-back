[<- routes](./../../route.md#room)

# Room details

### URL : /api/pg/`:pgId`/room/`:roomId`/calculate-room-light-bill

### Method : `GET`

---

### Description

return the data of guest with the calculate the lightBill according to time period of guest and their unit

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
{
  "id": "String",
  "name": "String",
  "capacity": "Number",
  "guests": [
    {
      "id": "String",
      "name": "String",
      "checkInDate": "String",
      "checkInReading": "Number",
      "checkOutReading": "Number",
      "checkOutDate": "String",
      "unitContribution": "Number"
    }
  ],
  "currentReading": "Number",
  "previousReading": "Number",
  "rate": "Number",
  "perBedContribution": "Number",
  "perHeadContribution": "Number"
}
```

---
