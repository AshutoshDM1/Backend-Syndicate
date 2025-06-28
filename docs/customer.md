### API FOR CUSTOMER:

#### BASE URL: `/api/v1/customers`

#### **ENDPOINTS:**

- GET - `/`

Response:

```json
{
  "customers": [
    {
      "id": "nprsPH31exOVauOcMgBjWwcQ22lVof7g",
      "userId": "nprsPH31exOVauOcMgBjWwcQ22lVof7g",
    //   .....
    }
  ],
  "totalCustomers": 1,
  "message": "Customer data fetched successfully"
}
```

---

- GET - `/get-customer/:id`

Response:

```json
{
  "customer": {
    "id": "nprsPH31exOVauOcMgBjWwcQ22lVof7g",
    "userId": "nprsPH31exOVauOcMgBjWwcQ22lVof7g",
    // ....
  },
  "message": "Customer data fetched successfully"
}
```
---

`TODO`

- POST - `/create-customer`

Response:

---

- put - `/update-customer`

Params:

```json
{
  "id":"nprsPH31exOVauOcMgBjWwcQ22lVof7g",
  "data":{
    // ...
  }
}
```

Response:

```json
{
  "customer": {
    "id": "nprsPH31exOVauOcMgBjWwcQ22lVof7g",
    "userId": "nprsPH31exOVauOcMgBjWwcQ22lVof7g",
    // ....
  },
  "message": "Customer Data updated successfully"
}
```
---

- DELETE - `/delete-customer`

Params:

```json
{
  "id":"nprsPH31exOVauOcMgBjWwcQ22lVof7g",
}
```

Response:

```json
{
  "customer": {
    "id": "nprsPH31exOVauOcMgBjWwcQ22lVof7g",
    "userId": "nprsPH31exOVauOcMgBjWwcQ22lVof7g",
    // ....
  },
  "message": "Customer Data Deleted successfully"
}
```