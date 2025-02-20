/*
Things to Carry API Documentation and Sample CURL Commands

1. Add Things to Carry
------------------------
Description: Add a new item to things to carry for a specific location
Method: POST
Endpoint: /api/superadmin/things-to-carry

Sample CURL:
curl -X POST http://localhost:3000/api/superadmin/things-to-carry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Water Bottle",
    "location_id": "65f123456789abcdef123456"
  }'

Expected Response:
{
  "message": "Things to carry added successfully",
  "data": {
    "_id": "65f123456789abcdef123457",
    "name": "Water Bottle",
    "location_id": "65f123456789abcdef123456",
    "is_deleted": false,
    "createdAt": "2024-03-13T10:30:00.000Z",
    "updatedAt": "2024-03-13T10:30:00.000Z"
  }
}

2. Get Things to Carry
------------------------
Description: Get all things to carry for a specific location
Method: GET
Endpoint: /api/superadmin/things-to-carry/:location_id

Sample CURL:
curl -X GET http://localhost:3000/api/superadmin/things-to-carry/65f123456789abcdef123456

Expected Response:
{
  "data": [
    {
      "id": "65f123456789abcdef123457",
      "name": "Water Bottle",
      "location_name": "Mountain Peak"
    },
    {
      "id": "65f123456789abcdef123458",
      "name": "Hiking Boots",
      "location_name": "Mountain Peak"
    }
  ]
}

3. Update Things to Carry
------------------------
Description: Update a specific item in things to carry
Method: PUT
Endpoint: /api/superadmin/things-to-carry/:location_id/:item_id

Sample CURL:
curl -X PUT http://localhost:3000/api/superadmin/things-to-carry/65f123456789abcdef123456/65f123456789abcdef123457 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Large Water Bottle"
  }'

Expected Response:
{
  "message": "Things to carry updated successfully",
  "data": {
    "_id": "65f123456789abcdef123457",
    "name": "Large Water Bottle",
    "location_id": "65f123456789abcdef123456",
    "is_deleted": false,
    "createdAt": "2024-03-13T10:30:00.000Z",
    "updatedAt": "2024-03-13T10:35:00.000Z"
  }
}

4. Delete Things to Carry
------------------------
Description: Soft delete a specific item from things to carry
Method: DELETE
Endpoint: /api/superadmin/things-to-carry/:location_id/:item_id

Sample CURL:
curl -X DELETE http://localhost:3000/api/superadmin/things-to-carry/65f123456789abcdef123456/65f123456789abcdef123457

Expected Response:
{
  "message": "Item deleted successfully"
}

Notes:
- Replace localhost:3000 with your actual API base URL
- Replace the IDs (65f123...) with actual MongoDB ObjectIds from your database
- The location_id should be a valid ID from the SuperAdmin collection
- All endpoints require proper authentication (Bearer token) in production
- Add -H "Authorization: Bearer your_token_here" to the curl commands when authentication is implemented
*/ 