[<- routes](./../../route.md#staff)

# Create a new staff

### URL : /api/pg/ `:pgId` /staff

### Method : `POST`

---

### Description

will create a new staff.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "name": "String", // required | length > 3
  "phone": "String", // required | length must be 10
  "type":"String",// required | ("'Laundry Worker', 'Cleaner', 'Security Guard', 'Electrician', 'Receptionist', 'Other')
  "info": "String",
  "gender":"String" // required | ('male', 'female')
}
```

### Response

### status : `200`

```json
{
  "id": "UUID",
  "name": "String",
  "phone": "String",
  "type": "String",
  "info": "String",
  "gender": "String"
}
```

---
