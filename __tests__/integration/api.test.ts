import request from "supertest";
import app from "../../src/server";

describe("API Integration Tests", () => {
  let createdUserId: number;

  describe("Complete User CRUD Workflow", () => {
    it("should perform full CRUD operations successfully", async () => {
      // 1. CREATE - Create a new user
      const createResponse = await request(app)
        .post("/api/users")
        .send({
          name: "Integration Test User",
          email: "integration@test.com",
          age: 28,
          city: "Integration City",
        })
        .expect(201);

      expect(createResponse.body.success).toBe(true);
      expect(createResponse.body.data.name).toBe("Integration Test User");
      expect(createResponse.body.data.email).toBe("integration@test.com");
      expect(createResponse.body.data.age).toBe(28);
      expect(createResponse.body.data.city).toBe("Integration City");

      createdUserId = createResponse.body.data.id;

      // 2. READ - Get the created user
      const readResponse = await request(app)
        .get(`/api/users/${createdUserId}`)
        .expect(200);

      expect(readResponse.body.success).toBe(true);
      expect(readResponse.body.data.id).toBe(createdUserId);
      expect(readResponse.body.data.name).toBe("Integration Test User");

      // 3. UPDATE - Update the user
      const updateResponse = await request(app)
        .patch(`/api/users/${createdUserId}`)
        .send({
          name: "Updated Integration User",
          age: 29,
        })
        .expect(200);

      expect(updateResponse.body.success).toBe(true);
      expect(updateResponse.body.data.name).toBe("Updated Integration User");
      expect(updateResponse.body.data.age).toBe(29);
      expect(updateResponse.body.data.email).toBe("integration@test.com"); // unchanged

      // 4. READ ALL - Verify user appears in list
      const listResponse = await request(app).get("/api/users").expect(200);

      expect(listResponse.body.success).toBe(true);
      expect(listResponse.body.count).toBeGreaterThan(0);

      const userInList = listResponse.body.data.find(
        (user: any) => user.id === createdUserId
      );
      expect(userInList).toBeDefined();
      expect(userInList.name).toBe("Updated Integration User");

      // 5. DELETE - Delete the user
      const deleteResponse = await request(app)
        .delete(`/api/users/${createdUserId}`)
        .expect(200);

      expect(deleteResponse.body.success).toBe(true);
      expect(deleteResponse.body.data.id).toBe(createdUserId);

      // 6. VERIFY DELETION - Confirm user is gone
      const verifyDeletionResponse = await request(app)
        .get(`/api/users/${createdUserId}`)
        .expect(404);

      expect(verifyDeletionResponse.body.success).toBe(false);
      expect(verifyDeletionResponse.body.error).toBe("User not found");
    });
  });

  describe("Data Consistency", () => {
    it("should maintain data consistency across operations", async () => {
      // Create multiple users
      const user1 = await request(app)
        .post("/api/users")
        .send({
          name: "User 1",
          email: "user1@test.com",
        })
        .expect(201);

      const user2 = await request(app)
        .post("/api/users")
        .send({
          name: "User 2",
          email: "user2@test.com",
        })
        .expect(201);

      // Verify both users exist
      const listResponse = await request(app).get("/api/users").expect(200);

      expect(listResponse.body.count).toBeGreaterThanOrEqual(2);

      const foundUser1 = listResponse.body.data.find(
        (u: any) => u.id === user1.body.data.id
      );
      const foundUser2 = listResponse.body.data.find(
        (u: any) => u.id === user2.body.data.id
      );

      expect(foundUser1).toBeDefined();
      expect(foundUser2).toBeDefined();

      // Clean up
      await request(app).delete(`/api/users/${user1.body.data.id}`);
      await request(app).delete(`/api/users/${user2.body.data.id}`);
    });
  });

  describe("Error Scenarios", () => {
    it("should handle concurrent operations gracefully", async () => {
      // Create a user
      const createResponse = await request(app)
        .post("/api/users")
        .send({
          name: "Concurrent Test User",
          email: "concurrent@test.com",
        })
        .expect(201);

      const userId = createResponse.body.data.id;

      // Try to update with duplicate email (should fail)
      const duplicateUser = await request(app)
        .post("/api/users")
        .send({
          name: "Another User",
          email: "concurrent@test.com",
        })
        .expect(400);

      expect(duplicateUser.body.success).toBe(false);
      expect(duplicateUser.body.error).toBe("Email already exists");

      // Original user should still exist and be accessible
      const verifyUser = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(verifyUser.body.success).toBe(true);
      expect(verifyUser.body.data.email).toBe("concurrent@test.com");

      // Clean up
      await request(app).delete(`/api/users/${userId}`);
    });
  });
});
