[<- routes](./../../route.md#pg)

# PG Unique Code

`public`

### URL : `/api/pg/verify-code/` `:code`

### Method : `GET`

---

### Description

Checks if a given PG code already exists or not.

---

### Response

### status;`204`

- no PG exists with the given code.

### status:`404`

```json
{
  "code": "duplicate_key_value",
  "message": "Code already exists"
}
```

---
