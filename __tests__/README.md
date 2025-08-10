# Testing Structure

This directory contains comprehensive unit tests and integration tests for the Node.js Express TypeScript API.

## 📁 Directory Structure

```
__tests__/
├── README.md                 # This file
├── setup.ts                  # Jest setup configuration
├── config/                   # Test configuration files
│   └── test.config.ts       # Test environment config
├── src/                      # Tests mirroring source structure
│   ├── types/               # Type definition tests
│   │   └── user.test.ts     # User interface tests
│   ├── routes/              # Route handler tests
│   │   └── userRoutes.test.ts # User API route tests
│   └── server.test.ts       # Main server tests
├── integration/              # Integration tests
│   └── api.test.ts          # Full API workflow tests
└── utils/                    # Test utilities
    └── testUtils.ts         # Common testing functions
```

## 🧪 Test Types

### Unit Tests

- **Types**: Test TypeScript interface definitions and type safety
- **Routes**: Test individual route handlers and middleware
- **Server**: Test server configuration and middleware setup

### Integration Tests

- **API Workflow**: Test complete CRUD operations end-to-end
- **Data Consistency**: Test data integrity across operations
- **Error Scenarios**: Test error handling and edge cases

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

## 📊 Coverage

Tests cover:

- ✅ All CRUD operations (Create, Read, Update, Delete)
- ✅ Input validation and error handling
- ✅ Type safety and interface compliance
- ✅ Middleware functionality
- ✅ API response formats
- ✅ Edge cases and error scenarios

## 🔧 Test Utilities

The `testUtils.ts` file provides:

- Mock Express Request/Response objects
- Sample test data
- Helper functions for common testing tasks

## 📝 Writing New Tests

1. **Follow the existing structure** - Mirror the source file organization
2. **Use descriptive test names** - Clear what each test validates
3. **Test both success and failure cases** - Cover edge cases
4. **Use beforeEach/afterEach** - Set up and clean up test data
5. **Mock external dependencies** - Keep tests isolated and fast

## 🎯 Test Goals

- **Fast execution** - Tests should run quickly
- **Reliable results** - No flaky tests
- **Good coverage** - Test all critical paths
- **Clear failures** - Easy to debug when tests fail
- **Maintainable** - Easy to update when code changes
