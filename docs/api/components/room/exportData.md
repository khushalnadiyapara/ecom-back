[<- routes](./../../route.md#room)

# Room details

### URL : /api/pg/`:pgId`/room/export

### Method : `GET`

---

### Description

return the details of the rooms.

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
  "headers": [
    {
      "name": "String",
      "key": "String"
    }
  ],

  "data": [
    {
      "id": "UUID",
      "name": "String",
      "capacity": "Number",
      "rent": "Number",
      "tags": "String",
      "info": "String",
      "occupied": "Number",
      "currentReading": "Number",
      "previousReading": "Number",
      "currentRate": "Number",
      "vacant": "Number",
      "consumption": "Number",
      "bill": "Number",
      "billPerBed": "Number",
      "billPerGuest": "Number"
    }
  ]
}
```

---
