# Blog Application

## Objective
This project is a basic blog application with a list view and a detail view for blog posts, demonstrating skills in frontend development, backend development, database management, and deployment.

### Backend (Node.js with Express)
- **Set up a RESTful API** with the following endpoints:
  - `GET /posts` - List all posts
  - `GET /posts/:id` - Get a specific post
  - `POST /posts` - Create a new post
  - `PUT /posts/:id` - Update a post
  - `DELETE /posts/:id` - Delete a post
  - `POST /login` - User login
  - `POST /logout` - User logout
  - `POST /comments` - Add a comment to a post
    
- **Implemented database model** for blog posts using PostgreSQL.
- **Implement JWT authentication** with sign-in and sign-out functionality.
- **Show conditional buttons** for sign-in and sign-out, and conditionally display the blog and add post pages.
- **Add a comment system** with author information and display comments for each post.
- **Display post details** (title, content, date, and author) on the home page.
- **Implement basic error handling** and input validation.

### Frontend (React with Vite, Tailwind)
- **Create a responsive layout** with a header, main content area, and footer.
- **Implement a list view** of blog posts, displaying title, content, date, and author.
- **Implement a detail view** for individual blog posts.
- **Create a form** for adding new blog posts.
- **Implement basic client-side form validation**.
- **Show sign-in and sign-out buttons** based on authentication state.
- **Conditionally display the blog and add post pages** based on authentication.

### Full Stack Integration
- **Connected the frontend** to the backend API.
- **Implemented proper error handling** and loading states.
- **Use appropriate state management techniques**.

### Deployment
- **Deploy the full stack application** to a cloud platform on Render.
- **Ensure the deployed application** is fully functional.
- **Provide clear documentation** on how to access and use the deployed application.

### Additional Features
- **Implement user authentication** using JWT.
- **Add a comment system** for blog posts with author information.
- **Implement a search functionality**.
- **Add unit tests** for both frontend and backend.
- **Set up a CI/CD pipeline** for automated deployment.

## Setup and Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```bash
   npm install
