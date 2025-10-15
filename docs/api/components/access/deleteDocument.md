[<- routes](./../../route.md#guest)

# Guest Document Delete

### URL : api/access/guest/document/`:documentId`

### Method : `DELETE`

---

### Description

will delete document of Guest.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"query":{
  "token": "String" // required (Token)
}

---

### Response

status : `204`

- not content return.

---
```
