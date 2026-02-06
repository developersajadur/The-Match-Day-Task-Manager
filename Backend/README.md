# 🛠 Match-Day Task Manager – Backend


The backend provides RESTful APIs for managing tasks, enforcing business rules, and maintaining consistent state between client and server.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- Zod
- JWT
- dotenv

---


## Setup Instructions

### Clone the Repository
```bash
git clone <https://github.com/developersajadur/The-Match-Day-Task-Manager>
cd The-Match-Day-Task-Manager/Backend

```


### Install Dependencies
```bash
npm install
```

### Environment Variables

Create a .env file using the example below:

```bash

NODE_ENV=development
PORT=5000
DATABASE_URL=your_database_connection_string_here
SALT_ROUNDS=your_salt_rounds_here
JWT_TOKEN_SECRET=your_jwt_token_secret_here
JWT_TOKEN_EXPIRES_IN=your_jwt_token_expiry_here
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5500


```

### Run the Server
```bash
npm run dev
```


### The server will start on:
```bash
http://localhost:5000
```

