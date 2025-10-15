[<- routes](./../../route.md#guest)

# Update Guest

### URL : /api/access/guest

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

"query":{
  "token": "String" // required (Token)
}

// the number of files you provide will be updated.
// all fields are not required, at list one field is required
"body": {
    "email": "string",
    "emergencyPhone": "string", // required
    "address": "string" // required
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
