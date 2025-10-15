[<- routes](./../../route.md#monthlypayment)

# Monthly Payment List Of Guest

### URL : /api/pg/`:pgId`/monthly-payment?`guestId`

### Method : `GET`

---

### Description

will return the list of monthly payments of the guest.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"query": {
  "guestId": "UUID" // required
}
```

---

### Response

### status : `200`

```json
[
  {
    "id": "string",
    "guestId": "string",
    "rent": "number",
    "lightBill": "number",
    "month": "number",
    "year": "number",
    "remark": "string",
    "date": "date",
    "rentPaymentMethod": "string", // required ['case','cheque','online']
    "lightBillPaymentMethod": "string", // required ['case','cheque','online']
    "createdAt": "string",
    "updatedAt": "string",
    "createdBy": "string",
    "updatedBy": "string"
  }
]
```

---
