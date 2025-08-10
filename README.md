# Node.js Express User API (TypeScript)

A RESTful API built with Node.js, Express, and TypeScript for user management with full CRUD operations.

## Features

- ✅ **GET** - Retrieve all users or user by ID
- ✅ **POST** - Create new user
- ✅ **PATCH** - Update existing user
- ✅ **DELETE** - Remove user
- 🔒 Security middleware (Helmet, CORS)
- 📝 Request logging (Morgan)
- 🎯 Error handling and validation
- 📊 Mock data storage
- 🚀 **TypeScript** - Full type safety and IntelliSense

## Project Structure

```
nodejs/
├── src/
│   ├── server.ts              # Main server file (TypeScript)
│   ├── types/
│   │   └── user.ts            # TypeScript interfaces and types
│   └── routes/
│       └── userRoutes.ts      # User API routes (TypeScript)
├── node-ai/
│   └── aiService.ts           # AI service with TypeScript
├── dist/                      # Compiled JavaScript (generated)
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. Start the server:

```bash
# Development mode (with auto-restart and TypeScript compilation)
npm run dev

# Production mode (runs compiled JavaScript)
npm start

# Watch mode for TypeScript compilation
npm run build:watch
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## TypeScript Features

- **Strict Type Checking** - Full type safety with strict TypeScript configuration
- **Interface Definitions** - Well-defined types for all API requests and responses
- **Generic Types** - Reusable type definitions for consistent API responses
- **Type Guards** - Runtime type checking and validation
- **Modern ES2020** - Latest JavaScript features with type safety

## API Endpoints

### Base URL: `http://localhost:3000/api/users`

| Method | Endpoint | Description     |
| ------ | -------- | --------------- |
| GET    | `/`      | Get all users   |
| GET    | `/:id`   | Get user by ID  |
| POST   | `/`      | Create new user |
| PATCH  | `/:id`   | Update user     |
| DELETE | `/:id`   | Delete user     |

### Health Check

- **GET** `/health` - Server status

## API Examples

### Get All Users

```bash
curl http://localhost:3000/api/users
```

### Get User by ID

```bash
curl http://localhost:3000/api/users/1
```

### Create New User

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 28,
    "city": "Boston"
  }'
```

### Update User

```bash
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "age": 31,
    "city": "San Francisco"
  }'
```

### Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## TypeScript Interfaces

### User Interface

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number | null;
  city: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### API Response Interface

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}
```

## Validation Rules

- **name**: Required, string
- **email**: Required, unique, string
- **age**: Optional, number
- **city**: Optional, string

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Success Responses

All success responses follow this format:

```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## Development

The project uses `ts-node-dev` for development, which automatically restarts the server when TypeScript files change and provides hot reloading.

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run build:watch` - Watch mode for TypeScript compilation
- `npm start` - Start production server (requires build first)

## Building for Production

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

The compiled JavaScript will be in the `dist/` folder.

## License

MIT
