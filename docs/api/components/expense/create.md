[<- routes](./../../route.md#expense)

# Create Expense

### URL : /api/pg/`:pgId`/expense

### Method : `POST`

---

### Description

Create a new expense.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
  "amount": "Number", // required
  "date": "String",// required
  "category": "String",  // required ('Stationery Printing expense', 'Electricity Bill', 'Water Bill', 'Salary expense', 'Mobile & Internet & TV Recharge', 'House Keeping Material', 'Torrent Bill Expense', 'Guest Deposit Return', 'Kitchen expense', 'Building Rent expense', 'Cook Salary')
  "description": "String", // required
  "paymentMethod": "String", // required ('cash' , 'bank')
  "sender": "String", // required
  "receiver":"String" // required
}
```

---

### Response

### status : `200`

```json
{
  "id": "String",
  "amount": "Number",
  "date": "String",
  "category": "String",
  "description": "String",
  "paymentMethod": "String",
  "sender": "String",
  "receiver": "String"
}
```

---
