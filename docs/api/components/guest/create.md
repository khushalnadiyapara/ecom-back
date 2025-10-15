[<- routes](./../../route.md#guest)

# Create a new Guest

### URL : /api/pg/`:pgId`/guest

### Method : `POST`

---

### Description

will create a new guest.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "name": "String", // required
  "email": "String", // required
  "phone": "String", // required | length must be 10
  "gender": "String", // required ("male" , "female")
  "rent": "number", // required min 0
  "checkInReading": "number", // min 0
  "deposit": "number", //  min 0
  "roomId": "String", // required
  "checkInDate": "String",
  "sharing": "number", // required
  "emergencyPhone": "String", // required
  "address": "String",
  "checkOutDate": "String",
  "info": "String",
  "inquiryId": "UUID", // inquiry id to change status
  "redirectUrl": "String", // redirect url for WhatsApp
  "type":"String", // required | (guest , booking , short leaving)
  "dateOfNotice":"String",
}
```

### Response

### status : `200`

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "gender": "string",
  "rent": "number",
  "checkInReading": "number",
  "deposit": "number",
  "roomId": "string",
  "checkInDate": "string",
  "sharing": "number",
  "emergencyPhone": "string",
  "address": "string",
  "checkOutDate": "string",
  "info": "string",
  "id": "string",
  "pgId": "string",
  "fullName": "string",
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
  "type": "String",
  "dateOfNotice": "String",
  "room": {
    "id": "string",
    "name": "string",
    "capacity": "number"
  }
}
```

---
