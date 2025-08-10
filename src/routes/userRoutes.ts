import { Router, Request, Response } from "express";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from "../types/user";

const router: Router = Router();

// Mock data for users
let users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    city: "New York",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 25,
    city: "Los Angeles",
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-16T11:00:00Z",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    age: 35,
    city: "Chicago",
    createdAt: "2024-01-17T12:00:00Z",
    updatedAt: "2024-01-17T12:00:00Z",
  },
];

// Helper function to generate new ID
const generateId = (): number => {
  if (users.length === 0) return 1;
  const maxId = Math.max(...users.map((user) => user["id"]));
  return maxId + 1;
};

// GET all users
router.get("/", (_req: Request, res: Response<UserListResponse>) => {
  try {
    const response: UserListResponse = {
      success: true,
      count: users.length,
      data: users,
    };
    res.status(200).json(response);
  } catch (error) {
    const response: UserListResponse = {
      success: false,
      error: "Failed to fetch users",
      count: 0,
    };
    res.status(500).json(response);
  }
});

// GET user by ID
router.get("/:id", (req: Request, res: Response<UserResponse>) => {
  try {
    const userId: number = parseInt(req.params["id"] || "0", 10);
    const user: User | undefined = users.find((u) => u.id === userId);

    if (!user) {
      const response: UserResponse = {
        success: false,
        error: "User not found",
      };
      return res.status(404).json(response);
    }

    const response: UserResponse = {
      success: true,
      data: user,
    };
    return res.status(200).json(response);
  } catch (error) {
    const response: UserResponse = {
      success: false,
      error: "Failed to fetch user",
    };
    return res.status(500).json(response);
  }
});

// POST create new user
router.post(
  "/",
  (
    req: Request<{}, {}, CreateUserRequest>,
    res: Response<CreateUserResponse>
  ) => {
    try {
      const { name, email, age, city }: CreateUserRequest = req.body;

      // Validation
      if (!name || !email) {
        const response: CreateUserResponse = {
          success: false,
          error: "Name and email are required",
          message: "Validation failed",
        };
        return res.status(400).json(response);
      }

      // Check if email already exists
      const existingUser: User | undefined = users.find(
        (u) => u.email === email
      );
      if (existingUser) {
        const response: CreateUserResponse = {
          success: false,
          error: "Email already exists",
          message: "Validation failed",
        };
        return res.status(400).json(response);
      }

      const newUser: User = {
        id: generateId(),
        name,
        email,
        age: age || null,
        city: city || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      users.push(newUser);

      const response: CreateUserResponse = {
        success: true,
        message: "User created successfully",
        data: newUser,
      };
      return res.status(201).json(response);
    } catch (error) {
      const response: CreateUserResponse = {
        success: false,
        error: "Failed to create user",
        message: "Internal server error",
      };
      return res.status(500).json(response);
    }
  }
);

// PATCH update user
router.patch(
  "/:id",
  (
    req: Request<{ id: string }, {}, UpdateUserRequest>,
    res: Response<UpdateUserResponse>
  ) => {
    try {
      const userId: number = parseInt(req.params["id"] || "0", 10);
      const userIndex: number = users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        const response: UpdateUserResponse = {
          success: false,
          error: "User not found",
          message: "User not found",
        };
        return res.status(404).json(response);
      }

      const { name, email, age, city }: UpdateUserRequest = req.body;

      // Check if email is being updated and if it already exists
      if (email && email !== users[userIndex]?.email) {
        const existingUser: User | undefined = users.find(
          (u) => u.email === email && u.id !== userId
        );
        if (existingUser) {
          const response: UpdateUserResponse = {
            success: false,
            error: "Email already exists",
            message: "Validation failed",
          };
          return res.status(400).json(response);
        }
      }

      // Update user fields
      if (name && users[userIndex]) users[userIndex].name = name;
      if (email && users[userIndex]) users[userIndex].email = email;
      if (age !== undefined && users[userIndex]) users[userIndex].age = age;
      if (city !== undefined && users[userIndex]) users[userIndex].city = city;

      if (users[userIndex]) {
        users[userIndex].updatedAt = new Date().toISOString();
      }

      if (users[userIndex]) {
        const response: UpdateUserResponse = {
          success: true,
          message: "User updated successfully",
          data: users[userIndex],
        };
        return res.status(200).json(response);
      } else {
        const response: UpdateUserResponse = {
          success: false,
          error: "User not found",
          message: "User not found",
        };
        return res.status(404).json(response);
      }
    } catch (error) {
      const response: UpdateUserResponse = {
        success: false,
        error: "Failed to update user",
        message: "Internal server error",
      };
      return res.status(500).json(response);
    }
  }
);

// DELETE user
router.delete(
  "/:id",
  (req: Request<{ id: string }>, res: Response<DeleteUserResponse>) => {
    try {
      const userId: number = parseInt(req.params["id"] || "0", 10);
      const userIndex: number = users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        const response: DeleteUserResponse = {
          success: false,
          error: "User not found",
          message: "User not found",
        };
        return res.status(404).json(response);
      }

      const deletedUser: User | undefined = users.splice(userIndex, 1)[0];

      if (!deletedUser) {
        const response: DeleteUserResponse = {
          success: false,
          error: "Failed to delete user",
          message: "User not found",
        };
        return res.status(404).json(response);
      }

      const response: DeleteUserResponse = {
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      };
      return res.status(200).json(response);
    } catch (error) {
      const response: DeleteUserResponse = {
        success: false,
        error: "Failed to delete user",
        message: "Internal server error",
      };
      return res.status(500).json(response);
    }
  }
);

export default router;
