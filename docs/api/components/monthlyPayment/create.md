[<- routes](./../../route.md#monthlypayment)

# Monthly Payment Create or Update

### URL : /api/pg/`:pgId`/monthly-payment]

### Method : `POST`

---

### Description

Create or Update monthly payment of guest.

> Note:  
> if `upsert` is `True` then record will be upserted.
> else record will be created.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"params": {
  "upsert": "Boolean" // if True then record will be upserted.
}

"body": {
  "guestId": "string",  // required
  "rent": "number",  // required, allowed Null
  "lightBill": "number",  // required, allowed Null
  "month": "number",  // required
  "year": "number",  // required
  "date": "date", // required
  "rentPaymentMethod": "string", // required ['case','cheque','online']
  "lightBillPaymentMethod": "string", // required ['case','cheque','online']
  "remark": "string"
}
```

---

### Response

### status : `200`

```json
{
  "id": "string",
  "guestId": "string",
  "rent": "number",
  "lightBill": "number",
  "month": "number",
  "year": "number",
  "remark": "string",
  "rentPaymentMethod": "string",
  "lightBillPaymentMethod": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "createdBy": "string",
  "updatedBy": "string"
}
```

---
