# BackEnd-final-project-E05-B

# Project 1: Blog Application
## Description
- A blog application that allows users to create, read, update, and delete blog posts.

### Technologies
- Node.js
- Express.js
- MongoDB
- Express Validator
- bvrypt.js
## Models
### User
- username (string)
- password (string)
- email (string)
### Post
- title (string)
- content (string)
- author (ObjectId)
- createdAt (Date)
- updatedAt (Date)
## Database Relations
- User has many posts
- Post belongs to one user
### Endpoints
- POST /signup - create a new user account
- POST /login - log in to an existing user account
- POST /logout - log out of the current user account
- GET /posts - get a list of all blog posts
- GET /posts/:id - get a single blog post by ID
- POST /posts - create a new blog post
- PUT /posts/:id - update an existing blog post by ID
- DELETE /posts/:id - delete a blog post by ID
## Validation
- POST /signup - validate username, password, and email
- POST /login - validate username and password
- POST /posts - validate title and content



 
 # Project 2: Task Manager
 ## Description
- A task manager application that allows users to create, read, update, and delete tasks.
- 
 ## Technologies
- Node.js
- Express.js
- MongoDB
- Express Validator
- bcrypt.js
## Models
### User
- username (string)
- password (string)
- email (string)
### Task
- title (string)
- description (string)
- completed (boolean)
- dueDate (Date)
- createdAt (Date)
- updatedAt (Date)
## Database Relations
- User has many tasks
- Task belongs to one user
## Endpoints
- POST /signup - create a new user account
- POST /login - log in to an existing user account
- POST /logout - log out of the current user account
- GET /tasks - get a list of all tasks
- GET /tasks/:id - get a single task by ID
- POST /tasks - create a new task
- PUT /tasks/:id - update an existing task by ID
- DELETE /tasks/:id - delete a task by ID
## Validation
- POST /signup - validate username, password, and email
- POST /login - validate username and password
- POST /tasks - validate title and description


# Project 3: E-commerce Platform
## Endpoints:

- GET /products: Get a list of all products
- POST /products: Create a new product
- GET /products/:id: Get details about a specific product
- PUT /products/:id: Update a specific product
- DELETE /products/:id: Delete a specific product
- POST /users: Create a new user account
- POST /login: Log in to the platform
- POST /logout: Log out of the platform
- GET /cart: Get the contents of a user's shopping cart
- POST /cart: Add a product to a user's shopping cart
- DELETE /cart/:id: Remove a product from a user's shopping cart
- POST /checkout: Complete a purchase and place an order
## Models:

- Product: Represents a product for sale, with fields like name, description, price, and quantity
- User: Represents a user account, with fields like email, username, and password
- Order: Represents an order placed by a user, with fields like total price and date placed
## Database Relations:
- 
- An Order can have many Products
- A User can have many Orders
- A Product can belong to many Orders (through an Order_Products table)
## Express Validator:

- Validate that a new Product has a unique name and a positive price
- Validate that a new User has a unique email address and a strong password
## Authentication:
- 
- Use JSON Web Tokens (JWTs) to authenticate users
- Hash user passwords before storing them in the database
- Check JWTs on protected routes to ensure users are authenticated
