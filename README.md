SlotSwapper App
Overview:

SlotSwapper is a backend system for managing user event slots and enabling slot swapping between users.
It includes user authentication, JWT-based authorization, and MongoDB integration via Mongoose.

Setup Instructions:
1️. Clone the repository

```bash
git clone https://github.com/Venkata-sampath/SlotSwapper.git
cd SlotSwapper
```

2️. Install dependencies

```bash
npm install
```

3️. Add environment variables

Create a .env file in the root folder and include:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4️. Run the server

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

API Endpoints:
| Method | Endpoint | Description | Auth Required |
|--------|-----------|--------------|----------------|
| POST | `/api/users/register` | Register a new user | ❌ |
| POST | `/api/users/login` | Login user | ❌ |
| GET | `/api/users/current` | Get current user | ✅ |
| GET | `/api/slots` | Get user slots | ✅ |
| POST | `/api/slots` | Create new slot | ✅ |
| PUT | `/api/slots/:id` | Update slot | ✅ |
| DELETE | `/api/slots/:id` | Delete slot | ✅ |
| GET | `/api/swaps/swappable-slots` | Get all swappable slots | ✅ |
| POST | `/api/swaps/swap-request` | Request a swap | ✅ |
| GET | `/api/swaps/incomingRequests` | Get incoming swap requests | ✅ |
| GET | `/api/swaps/outgoingRequests` | Get outgoing swap requests | ✅ |
| POST | `/api/swaps/:id` | Accept or reject a swap | ✅ |

```

Notes:

Authentication uses JWT tokens sent in headers.

All protected routes require a valid token.

Frontend development is in progress and will be added soon.

Tech Stack:

Node.js

Express.js

MongoDB + Mongoose

JWT for Authentication

dotenv for configuration


Frontend is in progress.

```
