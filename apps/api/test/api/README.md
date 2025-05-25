# API Tests

This directory contains API tests for the Relax API using Jest and Supertest.

## Prerequisites

- The API server must be running at http://localhost:3000
- Jest and Supertest must be installed

## Running the Tests

To run the API tests, use the following command:

```bash
npm run test:api
```

This command uses the Jest configuration in `test/jest-api.json` and runs tests in a single process with the `--runInBand` flag.

## Test Architecture

### Test Sequencing

Tests are executed in a specific order using Jest's TestSequencer. The order is defined in `test/api/test-sequencer.js`:

1. `launch.test.ts` - Runs first to generate and store URL fragments
2. `verify-token.test.ts` - Runs second and uses the stored URL fragments

### Shared State

Tests share data through a file-based shared state module (`test/api/shared-state.ts`). This allows:

- `launch.test.ts` to store URL fragments from the launch response
- `verify-token.test.ts` to use those fragments, particularly the ticket as a token

The shared state is implemented as a file-based storage system to ensure data persistence between test files, even when they run in separate processes. This approach is more reliable than in-memory storage when using Jest's test sequencer.

### Data Flow

1. `launch.test.ts` obtains a JWT token and launches a game
2. The launch response contains a game URL with various parameters
3. These parameters are stored in the shared state
4. `verify-token.test.ts` retrieves the parameters and uses the ticket as the token

This approach ensures that tests use consistent data and properly test the API flow from launch to token verification.

## Configuration Notes

### Test Ordering

Tests are ordered in two ways:
1. Using numeric prefixes in filenames (01-launch.test.ts, 02-verify-token.test.ts)
2. Using Jest's TestSequencer (configured in test-sequencer.js)

### Watch Mode

When running tests in watch mode with `npm run test:api:watch`, the shared state file (.test-state.json) is ignored in the watch patterns to prevent unnecessary test re-runs when the state changes.

### TypeScript Configuration

The project uses ts-jest with the following configuration:
- `isolatedModules: true` is set in tsconfig.json
- ts-jest configuration is set directly in the transform section of jest-api.json

