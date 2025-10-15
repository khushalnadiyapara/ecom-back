[<- routes](./../../route.md#expense)

# Delete expense

### URL : /api/pg/`:pgId`/expense/ `:expenseId`

### Method : `DELETE`

---

### Description

will delete the expense with the given id.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
```

---

### Response

status : `204`

- not content return.

---
