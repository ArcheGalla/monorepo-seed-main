# API Tests

## Overview

There are some tests to make sure the API is working as expected. These tests are located in the `test/api` directory.

The tests are running in sequence, becase the latter tests depend on the former ones. E.g. `02-verify-token.test.ts` depends on `01-launch.test.ts`, because the launch test produced `ticket` value that is used in the verify token test.

The state is shared between the tests using the shared state file. The shared state is stored in the `test/api/.test-state.json` file.

The order of the tests is defined in the `test/api/test-sequencer.js` file. Make sure to update the order if you add, remove or rename any test files.

## Running the tests

Before running the tests, make sure the database and API are running. The tests are run against the API running on `http://localhost:3000`, port is taken from the `.env` file.

To run the tests, use the following command:

```bash
npm run test:api
```
This will run all the tests in the `test/api` directory and output a compact test results summary.

## Some hints

To minimize useless output from the npm, use the `-s` flag:

```bash
npm -s run test:api
```

To run only a "success path" tests, use the `-t` flag:

```bash
npm -s run test:api -- -t ':SP:'
```
Here SP stands for "success path", and is present in the description of each test representing the success path.

To list all tests in the output - use --verbose flag:

```bash
npm -s run test:api -- --verbose
```

As most of the tests depend on previous tests, it can be good idea to stop test on the first failure:

```bash
npm -s run test:api -- --verbose --bail
```