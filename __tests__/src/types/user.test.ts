import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ApiResponse,
  UserListResponse,
  UserResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from "../../../src/types/user";

describe("User Types", () => {
  describe("User Interface", () => {
    it("should have all required properties", () => {
      const user: User = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        age: 25,
        city: "Test City",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      };

      expect(user.id).toBe(1);
      expect(user.name).toBe("Test User");
      expect(user.email).toBe("test@example.com");
      expect(user.age).toBe(25);
      expect(user.city).toBe("Test City");
      expect(user.createdAt).toBe("2024-01-01T00:00:00.000Z");
      expect(user.updatedAt).toBe("2024-01-01T00:00:00.000Z");
    });

    it("should allow null values for optional properties", () => {
      const user: User = {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        age: null,
        city: null,
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      };

      expect(user.age).toBeNull();
      expect(user.city).toBeNull();
    });
  });

  describe("CreateUserRequest Interface", () => {
    it("should have required properties", () => {
      const createRequest: CreateUserRequest = {
        name: "Test User",
        email: "test@example.com",
      };

      expect(createRequest.name).toBe("Test User");
      expect(createRequest.email).toBe("test@example.com");
    });

    it("should allow optional properties", () => {
      const createRequest: CreateUserRequest = {
        name: "Test User",
        email: "test@example.com",
        age: 25,
        city: "Test City",
      };

      expect(createRequest.age).toBe(25);
      expect(createRequest.city).toBe("Test City");
    });
  });

  describe("UpdateUserRequest Interface", () => {
    it("should have all properties as optional", () => {
      const updateRequest: UpdateUserRequest = {
        name: "Updated Name",
      };

      expect(updateRequest.name).toBe("Updated Name");
      expect(updateRequest.email).toBeUndefined();
      expect(updateRequest.age).toBeUndefined();
      expect(updateRequest.city).toBeUndefined();
    });
  });

  describe("ApiResponse Interface", () => {
    it("should have success and optional properties", () => {
      const successResponse: ApiResponse<string> = {
        success: true,
        data: "test data",
      };

      const errorResponse: ApiResponse<string> = {
        success: false,
        error: "error message",
      };

      expect(successResponse.success).toBe(true);
      expect(successResponse.data).toBe("test data");
      expect(errorResponse.success).toBe(false);
      expect(errorResponse.error).toBe("error message");
    });
  });

  describe("Response Interfaces", () => {
    it("should extend ApiResponse correctly", () => {
      const userListResponse: UserListResponse = {
        success: true,
        count: 2,
        data: [],
      };

      const userResponse: UserResponse = {
        success: true,
        data: {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          age: 25,
          city: "Test City",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
      };

      const createResponse: CreateUserResponse = {
        success: true,
        message: "User created",
        data: {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          age: 25,
          city: "Test City",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
      };

      const updateResponse: UpdateUserResponse = {
        success: true,
        message: "User updated",
        data: {
          id: 1,
          name: "Updated User",
          email: "test@example.com",
          age: 25,
          city: "Test City",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
      };

      const deleteResponse: DeleteUserResponse = {
        success: true,
        message: "User deleted",
        data: {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          age: 25,
          city: "Test City",
          createdAt: "2024-01-01T00:00:00.000Z",
          updatedAt: "2024-01-01T00:00:00.000Z",
        },
      };

      expect(userListResponse.success).toBe(true);
      expect(userListResponse.count).toBe(2);
      expect(userResponse.success).toBe(true);
      expect(createResponse.success).toBe(true);
      expect(updateResponse.success).toBe(true);
      expect(deleteResponse.success).toBe(true);
    });
  });
});
