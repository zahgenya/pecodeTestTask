# Facebook Like API

This API provides functionalities similar to Facebook's. The available endpoints are:

### Authentication
- **POST /login**: Logs in an existing account.
- **POST /register**: Registers a new user.

### Posts
- **POST /posts**: Creates a new user post.
- **GET /posts**: Retrieves all posts, with an optional `limit` parameter to limit the number of posts returned.

### Users
- **GET /users**: Retrieves all users.
- **GET /users/:id**: Retrieves a user by their ID.
- **GET /me**: Retrieves the current user's information based on `req.user`.