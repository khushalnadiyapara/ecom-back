[<- routes](./../../route.md#staff)

# staff Document Upload

### URL : /api/pg/`:pgId`/staff `/:staffId` /document

### Method : `POST`

---

### Description

<!-- will create a new document of staff -->

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
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
