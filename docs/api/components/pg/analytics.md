[<- routes](./../../route.md#pg)

# PG Analytics

### URL : `/api/pg/analytics`

### Method : `GET`

---

### Description

will return the analytics of the PG.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
```

---

### Response

### status : `200`

```json
{
  "bookingCount": "Number",
  "inquiryCount": "Number",
  "roomCount": "Number",
  "totalCapacity": "Number",
  "guestCount": "Number",
  "estimatedRent": "Number",
  "estimatedLightBill": "Number",
  "rentCollection": "Number",
  "lightBillCollection": "Number"
}
```

---
