# ERD: MAZRealty

This document explores the design of MAZRealty, a social experience for sharing useful programming resources.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a relational database, and serving HTTP traffic from a public endpoint.

## APIs

**users:**

- `POST /api/v1/users/` - Create a new user
- `GET /api/v1/users/` - Get all users
- `GET /api/v1/users/:id` - Get a user
- `PATCH /api/v1/users/:id` - Update a user (only for admin)
- `DELETE /api/v1/users/:id` - Delete a user (only for admin)
- `GET /api/v1/users/me` - Get the current user (only for authenticated users)
- `PATCH /api/v1/users/updateMe` - Update the current user (only for authenticated users)
- `PATCH /api/v1/users/updateMyPassword` - Update the current user's password (only for authenticated users)

**auth:**

- `POST /api/v1/auth/signup` - Sign up and get a token
- `POST /api/v1/auth/login` - Log in and get a token
- `GET /api/v1/auth/logout` - Log out and clear the token from the cookie

**properties:**

- `POST /api/v1/properties/` - Create a new property
- `GET /api/v1/properties/` - Get all properties
- `GET /api/v1/properties/:id` - Get a property
- `PATCH /api/v1/properties/:id` - Update a property (only for admin and property owner)
- `DELETE /api/v1/properties/:id` - Delete a property
- `PATCH api/v1/properties/add-images/:id` - Add images to a property (only for admin and property owner)
- `PATCH /api/v1/properties/delete-image/:id` - Delete an image from a property (only for admin and property owner)

- get all properties query options:
  - `GET /api/v1/properties/?sort=-price` - Sort by price descending
  - `GET /api/v1/properties/?fields=name,price` - Select only name and price fields
  - `GET /api/v1/properties/?limit=5` - Limit the number of results to 5
  - `GET /api/v1/properties/?page=2&limit=5` - Pagination, get the second page with 5 results

**user favorites:**

- `POST /api/v1/users/favorites/:id` - Add a property to favorites (only for authenticated users)
- `DELETE /api/v1/users/favorites/:id` - Remove a property from favorites (only for authenticated users)
- `GET /api/v1/users/favorites` - Get all favorite properties of the current user (only for authenticated users)

**lawyer:**

- `GET /api/v1/lawyers/not-approved` - Get all lawyers that are not approved (only for lawyer and admin)
- `PATCH api/v1/lawyers/approve-property/:id` - Approve a lawyer (only for lawyer and admin)

**cities:**

- `GET /api/v1/cities/` - Get all cities

**socket events:**

`newUser` - when is connected and authenticated (pass the userId)

`sendMessage` - when a user sends a message (
  pass the object having {
  **receiverId**: receiverId from response,
  **data**: all response
}
  
)

## Schema

**users:**

| Column               | Type   | Validation/Options                                              |
| -------------------- | ------ | --------------------------------------------------------------- |
| name                 | String | Required, Trimmed, Maximum length: 255 characters               |
| email                | String | Required, Unique, Lowercased, Validated as an email             |
| photo                | String | Default: 'default.jpg'                                          |
| role                 | String | Enum: ['user', 'guide', 'lead-guide', 'admin'], Default: 'user' |
| password             | String | Required, Minimum length: 8 characters, Select: false           |
| passwordConfirm      | String | Required, Validation function checks if it matches password     |
| passwordChangedAt    | Date   |                                                                 |
| passwordResetToken   | String |                                                                 |
| passwordResetExpires | Date   |                                                                 |

**Property**

| Column               | Type   | Validation/Options                                              |
| -------------------- | ------ | --------------------------------------------------------------- |
| name                 | String | Required, Trimmed, Maximum length: 255 characters               |
| description          | String | Required, Maximum length: 1000 characters                       |
| price                | Number | Required                                                        |
| owner                | Embedded Document | Required, ObjectID, Ref: 'User'                      |  
| address              | String | Required, Maximum length: 255 characters                        |
| images               | [String] | Required, Array of strings                                    |
| approved             | Boolean | Default: false                                                 |
| location             | GeoJSON | Required, Object, GeoJSON type: 'Point', Coordinates: [Number] |
