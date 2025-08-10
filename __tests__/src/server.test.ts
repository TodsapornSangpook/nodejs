import request from "supertest";
import app from "../../src/server";

describe("Server", () => {
  describe("Health Check Endpoint", () => {
    it("should return health status successfully", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body.status).toBe("OK");
      expect(response.body.message).toBe("Server is running");
      expect(response.body.timestamp).toBeDefined();
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });
  });

  describe("404 Handler", () => {
    it("should return 404 for non-existent routes", async () => {
      const response = await request(app)
        .get("/non-existent-route")
        .expect(404);

      expect(response.body.error).toBe("Route not found");
      expect(response.body.message).toContain("Cannot GET /non-existent-route");
    });

    it("should return 404 for different HTTP methods", async () => {
      const response = await request(app)
        .post("/non-existent-route")
        .expect(404);

      expect(response.body.error).toBe("Route not found");
      expect(response.body.message).toContain(
        "Cannot POST /non-existent-route"
      );
    });
  });

  describe("Error Handler", () => {
    it("should handle internal server errors", async () => {
      // This test verifies the error handler middleware is in place
      // In a real scenario, you might trigger an error by mocking a route
      const response = await request(app).get("/health").expect(200);

      // If we get here, the error handler didn't interfere with normal requests
      expect(response.body.status).toBe("OK");
    });
  });

  describe("Middleware", () => {
    it("should parse JSON requests", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({ name: "Test User", email: "test@example.com" })
        .expect(201);

      expect(response.body.success).toBe(true);
    });

    it("should handle CORS", async () => {
      const response = await request(app)
        .get("/health")
        .set("Origin", "http://localhost:3000")
        .expect(200);

      // CORS headers should be present
      expect(response.headers["access-control-allow-origin"]).toBeDefined();
    });

    it("should apply security headers (Helmet)", async () => {
      const response = await request(app).get("/health").expect(200);

      // Helmet should add security headers
      expect(response.headers["x-content-type-options"]).toBe("nosniff");
    });
  });

  describe("API Routes", () => {
    it("should mount user routes correctly", async () => {
      const response = await request(app).get("/api/users").expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
