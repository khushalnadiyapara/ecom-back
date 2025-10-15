[<- routes](./../../route.md#monthlypayment)

# Monthly Payment Update

### URL : /api/pg/`:pgId`/monthly-payment/`:monthlyPaymentId`

### Method : `POST`

---

### Description

will update the monthly payment with the given id.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "rent": "number",  // required
  "lightBill": "number",  // required
  "remark": "string",
  "date": "date", // required
  "rentPaymentMethod": "string", // required ['case','cheque','online']
  "lightBillPaymentMethod": "string", // required ['case','cheque','online']
}
```

---

### Response

### status : `204` : operation successful but no content to return

---
