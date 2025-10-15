[<- routes](./../../route.md#reminder)

# Upsert Reminder

### URL : /api/pg/`:pgId`/reminder/upsert

### Method : `POST`

---

### Description

will create or update the reminder.

> Note:  
> unique Reminder will be identify by `reference` field.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "type": "String", // required ( 'monthlyPayment' )
  "reference": "String", // required
  "date": "Date", // grater then equal to current date
  "description": "String"
}
```

---

### Response

### status : `200`

```json
{
  "id": "UUID",
  "month": "Integer",
  "year": "Integer",
  "guestId": "Number",
  "date": "Integer",
  "description": "String"
}
```

---

### cURL

```bash
curl --location 'http://localhost:3007/api/reminder/upsert' \
--data '{
            "type": "monthlyPayment",
            "reference": "2b5b5f77-c9c9-4736-8db9-9e8767151f0e-rent-8-2024-lightBill-7-2024",
            "date": "Wed Aug 21 2024 13:00:39 GMT+0530 (India Standard Time)",
            "description": "test description update"
        }'
```

---
