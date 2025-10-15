[<- routes](./../../route.md#guest)

# Guest List of PG

### URL : /api/pg/`:pgId`/guest

### Method : `GET`

---

### Description

return the list of guests in the PG.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
"query": {
  "isDeleted": "Boolean", // optional (default: false) (true: return deleted guests)
}
```

---

### Response

### status : `200`

```json
{
  "name": "String",
  "email": "string",
  "phone": "string",
  "gender": "string",
  "rent": "number",
  "deposit": "number",
  "roomId": "string",
  "checkInDate": "string",
  "sharing": "number",
  "emergencyPhone": "string",
  "address": "string",
  "checkOutDate": "string",
  "info": "string",
  "id": "string",
  "profileImage": "string",
  "isEmailVerified": "boolean",
  "isPhoneVerified": "string",
  "isDeleted": "boolean",
  "createdBy": "string",
  "updatedBy": "string",
  "deletedBy": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "deletedAt": "string",
  "dateOfNotice": "String",
  "type": "string",
  "room": {
    "id": "string",
    "name": "string",
    "capacity": "number"
  }
}
```

---
