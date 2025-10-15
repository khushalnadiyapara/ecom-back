[<- routes](./../../route.md#reminder)

# Reminder List of PG

### URL : /api/pg/`:pgId`/reminder

### Method : `GET`

---

### Description

will return the list of reminders.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
```

---

### Response

status : `200`

```json
[
  {
    "id": "UUID",
    "type": "String",
    "reference": "String",
    "date": "Integer",
    "description": "String"
  }
]
```

---
