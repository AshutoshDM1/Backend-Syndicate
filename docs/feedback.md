## Feedback API Documentation

Base URL: http://localhost:3030/api/v1/feedback


---

### Get All Feedbacks

GET /

Response:

```js
{
  "feedbacks": [ ... ],
  "total": 1,
  "message": "feedback data fetched successfully"
}
```


---

### Get Feedback by ID

GET /{feedback-id}

Response:

```json
{
  "feedback": {
    "id": "7c821857-74d6-4885-b3bd-42f5d0263651",
    "customerId": "string",
    "feedbackType": "RATING",
    "overallRating": null,
    "foodQualityRating": null,
    "serviceRating": null,
    "deliveryRating": null,
    "valueForMoneyRating": null,
    "feedbackText": null,
    "photos": [],
    "status": "PENDING",
    "priority": "MEDIUM",
    "categoryTags": [],
    "isPublic": false,
    "responseText": null,
    "respondedBy": null,
    "respondedAt": null,
    "resolutionStatus": "UNRESOLVED",
    "createdAt": "2025-07-15T06:03:28.889Z",
    "updatedAt": "2025-07-15T06:03:28.889Z"
  },
  "message": "feedback fetched successfully"
}
```


---

### Get Feedback with Details

GET /{feedback-id}?include=feedbackType,overallRating,customer

Response:

```json
{
  "feedback": {
    "id": "...",
    "feedbackType": "...",
    "overallRating": null,
    "customer": { ... }
  },
  "message": "feedback fetched successfully"
}
```


---

### Create Feedback

POST /

Body:

```json
{
  "data": {
    "customerId": "HUAVHJJgjsY7fUxkQBAfyNemwPlfS3sb"
  }
}
```

Response:

```json
{
  "feedbacks": { ... },
  "message": "feedback created successfully"
}
```


---

### Update Feedback

PUT /update-feedback

Body:

```json
{
  "id": "7c821857-74d6-4885-b3bd-42f5d0263651",
  "data": {
    "status": "IN_PROGRESS"
  }
}
```

Response:

```json
{
  "feedback": { ... },
  "message": "Feedback updated successfully"
}
```


---

### Delete Feedback

DELETE /delete-feedback

Body:

```json
{
  "id": "7c821857-74d6-4885-b3bd-42f5d0263651"
}
```

Response:

```json
{
  "feedback": { ... },
  "message": "Feedback Deleted successfully"
}
```