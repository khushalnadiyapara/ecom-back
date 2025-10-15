[<- routes](./../../route.md#guest)

# Pending Guest Payment

### URL : `/api/pg/`:pgId`/guest/filter/pending-monthly-payment

### Method : `GET`

---

### Description

will return the list of guests with monthly payment and associated reminder.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"query": {
  "month": "Number",
  "year": "Number"
}
```

---

### Response

### status : `200`

```json
[
  {
    "id": "UUID",
    "name": "String",
    "phone": "String",
    "sharing": "Number",
    "room": {
      "id": "UUID",
      "name": "String",
      "capacity": "Number"
    },
    "monthlyPayment": {
      "month": "Number",
      "year": "Number",
      "rent": "Number",
      "lightBill": "Number",
      "date": "date",
      "type": "string",
      "remark": "String"
    },
    "reminder": {
      "type": "monthlyPayment",
      "reference": "String",
      "date": "Date",
      "description": "String"
    }
  }
]
```

---
