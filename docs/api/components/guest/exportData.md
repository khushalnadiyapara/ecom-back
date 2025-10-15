[<- routes](./../../route.md#guest)

# guest List of PG

### URL : /api/pg/`:pgId`/guest/export-data

### Method : `GET`

---

### Description

return the list of all type of guest

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
"query": {
    "month":"Number",
    "year":"Number"
}
```

---

### Response

### status : `200`

```json
{
  "data": [
    {
      "name": "String",
      "phone": "String",
      "checkInDate": "String",
      "checkOutDate": "String",
      "deposit": "Number",
      "rent": "Number",
      "dateOfNotice": "String",
      "previousRoomName": "String",
      "previousRent": "Number",
      "roomName": "String",
      "id": "Number", //(1,2,3....)
      "particular": "String"
    }
  ],
  "headers": [
    {
      "name": "String",
      "key": "String"
    }
  ]
}
```

---
