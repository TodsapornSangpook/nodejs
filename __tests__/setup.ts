// Test setup file
import { config } from "dotenv";

// Load environment variables for testing (optional)
try {
  config({ path: ".env.test" });
} catch (error) {
  // If .env.test doesn't exist, continue without it
  console.log("No .env.test file found, using default test environment");
}

// Set test environment
process.env["NODE_ENV"] = "test";

// Global test timeout
jest.setTimeout(10000);
