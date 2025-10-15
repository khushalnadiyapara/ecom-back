[<- routes](./../../route.md#staff)

# Update staff

### URL : /api/pg/`:pgId`/staff/ `:staff`

### Method : `PUT`

---

### Description

Update the staff details by id.

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
    "type":"String", //("'Laundry Worker', 'Cleaner', 'Security Guard', 'Electrician', 'Receptionist', 'Other')
    "info": "String",
    "gender":"String" //  ("male" , "female")
  }
```

---

### Response

### status : `204`

- not content return.
