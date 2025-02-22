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

Product API Documentation and Sample CURL Commands

1. Add Product
------------------------
Description: Add a new product
Method: POST
Endpoint: /api/superadmin/products

Sample CURL:
curl -X POST http://localhost:3000/api/superadmin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token_here" \
  -d '{
    "name": "Camping Tent",
    "description": "4-person waterproof tent",
    "price": 199.99,
    "discounted_price": 179.99,
    "image_url": "https://example.com/images/tent.jpg"
  }'

Expected Response:
{
  "message": "Product added successfully",
  "data": {
    "_id": "65f123456789abcdef123459",
    "name": "Camping Tent",
    "created_by_id": "65f123456789abcdef123460",
    "description": "4-person waterproof tent",
    "price": 199.99,
    "discounted_price": 179.99,
    "image_url": "https://example.com/images/tent.jpg",
    "is_deleted": false,
    "createdAt": "2024-03-13T10:30:00.000Z",
    "updatedAt": "2024-03-13T10:30:00.000Z"
  }
}

2. Get All Products
------------------------
Description: Get all products (optionally filter by created_by_id)
Method: GET
Endpoint: /api/superadmin/products
Optional Query: ?created_by_id=65f123456789abcdef123460

Sample CURL:
curl -X GET http://localhost:3000/api/superadmin/products

Expected Response:
{
  "data": [
    {
      "_id": "65f123456789abcdef123459",
      "name": "Camping Tent",
      "created_by_id": {
        "_id": "65f123456789abcdef123460",
        "name": "John Doe",
        "email": "john@example.com",
        "phone_number": "1234567890"
      },
      "description": "4-person waterproof tent",
      "price": 199.99,
      "discounted_price": 179.99,
      "image_url": "https://example.com/images/tent.jpg"
    }
  ]
}

3. Get Product by ID
------------------------
Description: Get a specific product by ID
Method: GET
Endpoint: /api/superadmin/products/:id

Sample CURL:
curl -X GET http://localhost:3000/api/superadmin/products/65f123456789abcdef123459

4. Update Product
------------------------
Description: Update a specific product
Method: PUT
Endpoint: /api/superadmin/products/:id

Sample CURL:
curl -X PUT http://localhost:3000/api/superadmin/products/65f123456789abcdef123459 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_token_here" \
  -d '{
    "name": "Large Camping Tent",
    "price": 219.99,
    "discounted_price": 189.99
  }'

Expected Response:
{
  "message": "Product updated successfully",
  "data": {
    "_id": "65f123456789abcdef123459",
    "name": "Large Camping Tent",
    "price": 219.99,
    "discounted_price": 189.99,
    // ... other fields remain unchanged
  }
}

5. Delete Product
------------------------
Description: Soft delete a specific product
Method: DELETE
Endpoint: /api/superadmin/products/:id

Sample CURL:
curl -X DELETE http://localhost:3000/api/superadmin/products/65f123456789abcdef123459 \
  -H "Authorization: Bearer your_token_here"

Expected Response:
{
  "message": "Product deleted successfully"
}

Notes:
- Replace localhost:3000 with your actual API base URL
- Replace the IDs with actual MongoDB ObjectIds from your database
- All endpoints except GET require authentication
- The Authorization header is required for POST, PUT, and DELETE operations
- Discounted price must be less than or equal to regular price
- Image URL should be a valid URL to the product image
*/ 