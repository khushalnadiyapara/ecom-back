[<- routes](./../../route.md#expense)

# Update expense

### URL : /api/pg/`:pgId`/expense/ `:expenseId`

### Method : `PUT`

---

### Description

Update the expense details by id.

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

### status : `204`

- not content return.
