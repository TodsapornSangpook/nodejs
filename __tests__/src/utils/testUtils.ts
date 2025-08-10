import { Request, Response } from "express";
import { User } from "../../../src/types/user";

// Mock Express Request and Response
export const createMockRequest = (
  overrides: Partial<Request> = {}
): Partial<Request> => ({
  params: {},
  body: {},
  query: {},
  ...overrides,
});

export const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  return res;
};

// Mock user data for testing
export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    city: "New York",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    city: "Los Angeles",
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  },
];

// Helper to reset mock functions
export const resetMocks = (res: Partial<Response>) => {
  (res.status as jest.Mock).mockClear();
  (res.json as jest.Mock).mockClear();
  (res.send as jest.Mock).mockClear();
};
