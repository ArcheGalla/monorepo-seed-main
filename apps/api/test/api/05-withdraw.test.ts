import * as request from 'supertest';
import sharedState from './shared-state';
import envConfig from './env-config';

describe('Withdraw Flow', () => {
  const baseUrl = `http://localhost:${envConfig.port}`;

  // Test to withdraw with valid payload
  it('POST /api/relax/withdraw should return valid response with proper payload :SP:', async () => {
    // Check if we have data from the verify token test
    const hasVerifyTokenResponse = sharedState.has('verifyTokenResponse');
    if (!hasVerifyTokenResponse) {
      throw new Error('Verify token response not found in shared state');
    }

    // Check if we have data from the get balance test
    const hasGetBalanceResponse = sharedState.has('getBalanceResponse-01');
    if (!hasGetBalanceResponse) {
      throw new Error('Get balance response not found in shared state');
    }

    // Get the verify token response from shared state
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');

    // Get the previous balance from shared state
    const previousBalanceResponse = sharedState.get('getBalanceResponse-01');
    const previousBalance = previousBalanceResponse.balance;

    // Create a valid payload based on the WithdrawRequestDto
    const withdrawData = {
      gameid: 'casino',
      customerid: verifyTokenResponse.customerid,
      gamesessionid: 'round-123456',
      gameref: sharedState.get('launchUrlParams')?.gameid || 'moneytrain4',
      channel: sharedState.get('launchUrlParams')?.channel || 'web',
      clientid: 'web_windows',
      currency: verifyTokenResponse.customercurrency,
      cashiertoken: verifyTokenResponse.cashiertoken,
      txid: Math.floor(Math.random() * 1000000), // Generate a random transaction ID
      amount: 500, // Withdraw 500 units (5.00 in currency)
      txtype: 'withdraw',
      ended: false,
    };

    const req = request(baseUrl).post('/api/relax/withdraw').send(withdrawData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    const response = await req.expect('Content-Type', /json/).expect(200);

    // Verify response structure based on WithdrawResponseDto
    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');

    expect(response.body).toHaveProperty('txid');
    expect(typeof response.body.txid).toBe('number');
    expect(response.body.txid).toBe(withdrawData.txid);

    expect(response.body).toHaveProperty('remotetxid');
    expect(typeof response.body.remotetxid).toBe('string');

    // Verify the balance was reduced by the withdraw amount
    expect(response.body.balance).toBe(previousBalance - withdrawData.amount);

    // Store the response for future tests
    sharedState.set('withdrawResponse', response.body);
  });

  // Test amount more than balance
  it('POST /api/relax/withdraw should return 403 when withdraw amount is more than balance', async () => {
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');
    const excessiveWithdrawData = {
      gameid: 'casino',
      customerid: verifyTokenResponse.customerid,
      gamesessionid: 'round-123456',
      gameref: sharedState.get('launchUrlParams')?.gameid || 'moneytrain4',
      channel: sharedState.get('launchUrlParams')?.channel || 'web',
      clientid: 'web_windows',
      currency: verifyTokenResponse.customercurrency,
      cashiertoken: verifyTokenResponse.cashiertoken,
      txid: Math.floor(Math.random() * 1000000), // Generate a random transaction ID
      amount: Number.MAX_SAFE_INTEGER, // Withdraw maxint
      txtype: 'withdraw',
      ended: false,
    };

    const req = request(baseUrl).post('/api/relax/withdraw').send(excessiveWithdrawData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    const response = await req.expect('Content-Type', /json/).expect(403);
    expect(response.body).toHaveProperty('errorcode', 'INSUFFICIENT_FUNDS');
  });

  // Test with missing required fields
  it('POST /api/relax/withdraw should return 400 with missing required fields', async () => {
    // Missing required 'amount' field
    const invalidData = {
      customerid: 'test-customer-id',
      currency: 'GC.',
    };

    const req = request(baseUrl).post('/api/relax/withdraw').send(invalidData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(400);
  });

  // Test with invalid customer ID
  it('POST /api/relax/withdraw should return 403 with invalid customer ID', async () => {
    const invalidCustomerData = {
      gameid: 'casino',
      customerid: '5553516e-496c-4ac7-a8c3-233723735c59', // Invalid customer ID
      gamesessionid: 'round-123456',
      gameref: 'moneytrain4',
      channel: 'web',
      clientid: 'web_windows',
      currency: 'GC.',
      cashiertoken: '5553516e-496c-4ac7-a8c3-233723735c59',
      txid: 12345,
      amount: 500,
      txtype: 'withdraw',
      ended: false,
    };

    const req = request(baseUrl).post('/api/relax/withdraw').send(invalidCustomerData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(403);
  });

  // Test with invalid channel value
  it('POST /api/relax/withdraw should return 400 with invalid channel value', async () => {
    // Get the verify token response from shared state
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');

    const invalidChannelData = {
      gameid: 'casino',
      customerid: verifyTokenResponse.customerid,
      gamesessionid: 'round-123456',
      gameref: 'moneytrain4',
      channel: 'invalid_channel', // Only 'web' or 'mobile' are valid
      clientid: 'web_windows',
      currency: verifyTokenResponse.customercurrency,
      cashiertoken: verifyTokenResponse.cashiertoken,
      txid: 12345,
      amount: 500,
      txtype: 'withdraw',
      ended: false,
    };

    const req = request(baseUrl).post('/api/relax/withdraw').send(invalidChannelData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(400);
  });
});
