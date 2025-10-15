[<- routes](./../../route.md#guest)

# Update Guest Profile Image

### URL : /api/access/guest/profile-image

### Method : `POST`

---

### Description

Update the guest profile image by id.

---

### Request

```json

"header": {
  "Authorization" : "String" // required (Token)
}

"query":{
  "token": "String" // required (Token)
}

"body": {
    "file": "File"
  }
```

---

### Response

### status : `200`

```json
{
  "profileImage": "URL"
}
```

---
