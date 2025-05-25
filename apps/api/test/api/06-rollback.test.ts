import * as request from 'supertest';
import sharedState from './shared-state';
import envConfig from './env-config';

describe('Rollback Flow', () => {
  const baseUrl = `http://localhost:${envConfig.port}`;

  // Test to rollback a withdraw with valid payload
  it('POST /api/relax/rollback should return valid response with proper payload :SP:', async () => {
    // Check if we have data from the verify token test
    const hasVerifyTokenResponse = sharedState.has('verifyTokenResponse');
    if (!hasVerifyTokenResponse) {
      throw new Error('Verify token response not found in shared state');
    }

    // Check if we have data from the withdraw test
    const hasWithdrawResponse = sharedState.has('withdrawResponse');
    if (!hasWithdrawResponse) {
      throw new Error('Withdraw response not found in shared state');
    }

    // Check if we have data from the get balance test (pre-withdraw balance)
    const hasGetBalanceResponse = sharedState.has('getBalanceResponse-01');
    if (!hasGetBalanceResponse) {
      throw new Error('Get balance response not found in shared state');
    }

    // Get the verify token response from shared state
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');

    // Get the withdraw response from shared state
    const withdrawResponse = sharedState.get('withdrawResponse');

    // Get the pre-withdraw balance from shared state
    const preWithdrawBalance = sharedState.get('getBalanceResponse-01').balance;

    // Create a valid payload based on the RollbackRequestDto
    const rollbackData = {
      customerid: verifyTokenResponse.customerid,
      txid: Math.floor(Math.random() * 1000000), // Generate a random transaction ID for rollback
      originaltxid: withdrawResponse.txid, // Use the withdraw txid as the original txid
      gamesessionid: 'round-123456', // Same as used in withdraw test
    };

    const req = request(baseUrl).post('/api/relax/rollback').send(rollbackData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    const response = await req.expect('Content-Type', /json/).expect(200);

    // Verify response structure based on RollbackResponseDto
    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');

    expect(response.body).toHaveProperty('txid');
    expect(typeof response.body.txid).toBe('number');
    expect(response.body.txid).toBe(rollbackData.txid);

    expect(response.body).toHaveProperty('remotetxid');
    expect(typeof response.body.remotetxid).toBe('string');

    // Verify the balance after rollback is equal to pre-withdraw balance
    expect(response.body.balance).toBe(preWithdrawBalance);

    // Store the response for potential future tests
    sharedState.set('rollbackResponse', response.body);
  });

  // Test with missing required fields
  it('POST /api/relax/rollback should return 400 with missing required fields', async () => {
    // Missing required 'originaltxid' field
    const invalidData = {
      customerid: 'test-customer-id',
      txid: 12345,
      gamesessionid: 'round-123456',
    };

    const req = request(baseUrl).post('/api/relax/rollback').send(invalidData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(400);
  });

  // Test with invalid customer ID
  it('POST /api/relax/rollback should return 403 with invalid customer ID', async () => {
    const invalidCustomerData = {
      customerid: '5553516e-496c-4ac7-a8c3-233723735c59', // Invalid customer ID
      txid: 12345,
      originaltxid: 67890,
      gamesessionid: 'round-123456',
    };

    const req = request(baseUrl).post('/api/relax/rollback').send(invalidCustomerData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(403);
  });

  // Test with non-existent original transaction ID
  it('POST /api/relax/rollback should return 403 with non-existent original transaction ID', async () => {
    // Get the verify token response from shared state
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');

    const nonExistentTxData = {
      customerid: verifyTokenResponse.customerid,
      txid: Math.floor(Math.random() * 1000000),
      originaltxid: 999999999, // Non-existent transaction ID
      gamesessionid: 'round-123456',
    };

    const req = request(baseUrl).post('/api/relax/rollback').send(nonExistentTxData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(403);
  });
});
