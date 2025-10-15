[<- routes](./../../route.md#guest)

# Guest Document Upload

### URL : /api/access/guest/document

### Method : `POST`

---

### Description

will create a new document of Guest.

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
  "file": "File", // required
  "name":"String" // required
}
```

---

### Response

### status : `200`

```json
{
  "id": "UUID",
  "name": "String",
  "image": "String"
}
```

---
