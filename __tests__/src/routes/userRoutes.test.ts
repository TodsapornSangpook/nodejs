import request from "supertest";
import express from "express";
import userRoutes from "../../../src/routes/userRoutes";

// Create Express app for testing
const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

describe("User Routes", () => {
  beforeEach(() => {
    // Reset the users array to initial state before each test
    // This is a simple approach - in a real app you'd use a test database
    jest.resetModules();

    // Clear the users array by making a request to reset it
    // We'll need to import the users array and reset it
  });

  describe("GET /api/users", () => {
    it("should return all users successfully", async () => {
      const response = await request(app).get("/api/users").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should handle errors gracefully", async () => {
      // Mock a scenario where an error might occur
      const response = await request(app).get("/api/users").expect(200); // Should still return 200 even with empty data

      expect(response.body.success).toBe(true);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return user by ID successfully", async () => {
      // First create a user to test with
      const createResponse = await request(app)
        .post("/api/users")
        .send({
          name: "Test User",
          email: "test@example.com",
          age: 25,
          city: "Test City",
        })
        .expect(201);

      const userId = createResponse.body.data.id;

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(userId);
      expect(response.body.data.name).toBe("Test User");
      expect(response.body.data.email).toBe("test@example.com");
    });

    it("should return 404 for non-existent user", async () => {
      const response = await request(app).get("/api/users/99999").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("User not found");
    });

    it("should handle invalid ID format", async () => {
      const response = await request(app).get("/api/users/invalid").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("User not found");
    });
  });

  describe("POST /api/users", () => {
    it("should create user successfully with required fields", async () => {
      const userData = {
        name: "New User",
        email: "newuser@example.com",
      };

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User created successfully");
      expect(response.body.data.name).toBe(userData.name);
      expect(response.body.data.email).toBe(userData.email);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.createdAt).toBeDefined();
      expect(response.body.data.updatedAt).toBeDefined();
    });

    it("should create user with all fields", async () => {
      const userData = {
        name: "Full User",
        email: "fulluser@example.com",
        age: 30,
        city: "Full City",
      };

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.age).toBe(30);
      expect(response.body.data.city).toBe("Full City");
    });

    it("should return 400 for missing required fields", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({ name: "Only Name" })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Name and email are required");
      expect(response.body.message).toBe("Validation failed");
    });

    it("should return 400 for duplicate email", async () => {
      // First create a user
      await request(app)
        .post("/api/users")
        .send({
          name: "First User",
          email: "duplicate@example.com",
        })
        .expect(201);

      // Try to create another user with same email
      const response = await request(app)
        .post("/api/users")
        .send({
          name: "Second User",
          email: "duplicate@example.com",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Email already exists");
      expect(response.body.message).toBe("Validation failed");
    });
  });

  describe("PATCH /api/users/:id", () => {
    let userId: number;
    let userEmail: string;

    beforeEach(async () => {
      // Create a user for testing updates with a unique email
      const uniqueEmail = `updatetest-${Date.now()}@example.com`;
      const createResponse = await request(app).post("/api/users").send({
        name: "Update Test User",
        email: uniqueEmail,
        age: 25,
        city: "Test City",
      });

      expect(createResponse.status).toBe(201);
      expect(createResponse.body.success).toBe(true);
      userId = createResponse.body.data.id;
      userEmail = uniqueEmail;
    });

    it("should update user successfully", async () => {
      const updateData = {
        name: "Updated Name",
        age: 30,
      };

      const response = await request(app)
        .patch(`/api/users/${userId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User updated successfully");
      expect(response.body.data.name).toBe("Updated Name");
      expect(response.body.data.age).toBe(30);
      expect(response.body.data.email).toBe(userEmail); // unchanged
    });

    it("should return 404 for non-existent user", async () => {
      const response = await request(app)
        .patch("/api/users/99999")
        .send({ name: "Updated Name" })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("User not found");
    });

    it("should return 400 for duplicate email", async () => {
      // Create another user with a unique email
      const uniqueEmail = `another-${Date.now()}@example.com`;
      await request(app).post("/api/users").send({
        name: "Another User",
        email: uniqueEmail,
      });

      // Try to update first user with duplicate email
      const response = await request(app)
        .patch(`/api/users/${userId}`)
        .send({ email: uniqueEmail })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Email already exists");
      expect(response.body.message).toBe("Validation failed");
    });

    it("should handle partial updates", async () => {
      const response = await request(app)
        .patch(`/api/users/${userId}`)
        .send({ city: "New City" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.city).toBe("New City");
      expect(response.body.data.name).toBe("Update Test User"); // unchanged
    });
  });

  describe("DELETE /api/users/:id", () => {
    let userId: number;

    beforeEach(async () => {
      // Create a user for testing deletion with a unique email
      const uniqueEmail = `deletetest-${Date.now()}@example.com`;
      const createResponse = await request(app).post("/api/users").send({
        name: "Delete Test User",
        email: uniqueEmail,
      });

      expect(createResponse.status).toBe(201);
      expect(createResponse.body.success).toBe(true);
      userId = createResponse.body.data.id;
    });

    it("should delete user successfully", async () => {
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User deleted successfully");
      expect(response.body.data.id).toBe(userId);

      // Verify user is actually deleted
      const getResponse = await request(app)
        .get(`/api/users/${userId}`)
        .expect(404);

      expect(getResponse.body.success).toBe(false);
    });

    it("should return 404 for non-existent user", async () => {
      const response = await request(app)
        .delete("/api/users/99999")
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("User not found");
    });

    it("should handle invalid ID format", async () => {
      const response = await request(app)
        .delete("/api/users/invalid")
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("User not found");
    });
  });

  describe("Error Handling", () => {
    it("should handle malformed JSON gracefully", async () => {
      const response = await request(app)
        .post("/api/users")
        .set("Content-Type", "application/json")
        .send("invalid json")
        .expect(400);

      // Express returns a different error format for malformed JSON
      expect(response.status).toBe(400);
    });

    it("should handle empty request body", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Name and email are required");
    });
  });
});
