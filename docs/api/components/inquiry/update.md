[<- routes](./../../route.md#inquiry)

# Inquiry Status Update

### URL : /api/pg/`:pgId`/inquiry:`inquiryId`

### Method : `PUT`

---

### Description

Update inquiry by the id.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
// the number of files you provide will be updated.
// all fields are not required, at list one field is required
"body": {
    "name": "String",
    "phone": "String",
    "sharing": "Number",
    "message": "String",
    "status":"String", // required  any from ('pending', 'complete', 'visited', 'converted')
    "token": "Number"
  }
```

---

### Response

### status : `204`

- Operation successful, but no content return.
