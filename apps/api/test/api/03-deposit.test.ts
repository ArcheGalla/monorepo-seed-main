import * as request from 'supertest';
import sharedState from './shared-state';
import envConfig from './env-config';

describe('Deposit Flow', () => {
  const baseUrl = `http://localhost:${envConfig.port}`;

  // Test to deposit with valid payload and cashiertoken
  it('POST /api/relax/deposit should return valid response with proper payload and cashiertoken :SP:', async () => {
    // Check if we have data from the verify token test
    const hasVerifyTokenResponse = sharedState.has('verifyTokenResponse');
    if (!hasVerifyTokenResponse) {
      throw new Error('Verify token response not found in shared state');
    }

    // Check if we have data from the get balance test
    const hasGetBalanceResponse = sharedState.has('verifyTokenResponse');
    if (!hasGetBalanceResponse) {
      throw new Error('Get balance response not found in shared state');
    }

    // Get the verify token response from shared state
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');

    // Get the previous balance from shared state
    const previousBalanceResponse = sharedState.get('verifyTokenResponse');
    const previousBalance = previousBalanceResponse.balance;

    // Create a valid payload based on the DepositRequestDto
    const depositAmount = 100000; // Deposit 100000 units (1000.00 in currency)
    const depositData = {
      gameid: 'casino',
      customerid: verifyTokenResponse.customerid,
      gamesessionid: 'round-123456',
      gameref: sharedState.get('launchUrlParams')?.gameid || 'moneytrain4',
      channel: sharedState.get('launchUrlParams')?.channel || 'web',
      clientid: 'web_windows',
      currency: verifyTokenResponse.customercurrency,
      cashiertoken: verifyTokenResponse.cashiertoken,
      txid: Math.floor(Math.random() * 1000000), // Generate a random transaction ID
      amount: depositAmount,
      txtype: 'deposit',
      ended: true,
    };

    const req = request(baseUrl).post('/api/relax/deposit').send(depositData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    const response = await req.expect('Content-Type', /json/).expect(200);

    // Verify response structure based on DepositResponseDto
    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');

    expect(response.body).toHaveProperty('txid');
    expect(typeof response.body.txid).toBe('number');
    expect(response.body.txid).toBe(depositData.txid);

    expect(response.body).toHaveProperty('remotetxid');
    expect(typeof response.body.remotetxid).toBe('string');

    // Verify the balance was increased by the deposit amount
    expect(response.body.balance).toBe(previousBalance + depositAmount);

    // Store the response for future tests
    sharedState.set('depositResponse-withToken', response.body);
  });

  // Test to deposit with valid payload without cashiertoken
  it('POST /api/relax/deposit should return valid response with proper payload without cashiertoken :SP:', async () => {
    // Check if we have data from the verify token test
    const hasVerifyTokenResponse = sharedState.has('verifyTokenResponse');
    if (!hasVerifyTokenResponse) {
      throw new Error('Verify token response not found in shared state');
    }

    // Get the verify token response from shared state
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');

    // Get the previous balance from shared state (now updated after the first deposit)
    const previousBalanceResponse = sharedState.get('depositResponse-withToken');
    const previousBalance = previousBalanceResponse.balance;

    // Create a valid payload based on the DepositRequestDto (without cashiertoken)
    const depositAmount = 500; // Deposit 500 units (5.00 in currency)
    const depositData = {
      gameid: 'casino',
      customerid: verifyTokenResponse.customerid,
      gamesessionid: 'round-123457',
      gameref: sharedState.get('launchUrlParams')?.gameid || 'moneytrain4',
      channel: sharedState.get('launchUrlParams')?.channel || 'web',
      clientid: 'web_windows',
      currency: verifyTokenResponse.customercurrency,
      // No cashiertoken here
      txid: Math.floor(Math.random() * 1000000), // Generate a random transaction ID
      amount: depositAmount,
      txtype: 'deposit',
      ended: true,
    };

    const req = request(baseUrl).post('/api/relax/deposit').send(depositData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    const response = await req.expect('Content-Type', /json/).expect(200);

    // Verify response structure based on DepositResponseDto
    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');

    expect(response.body).toHaveProperty('txid');
    expect(typeof response.body.txid).toBe('number');
    expect(response.body.txid).toBe(depositData.txid);

    expect(response.body).toHaveProperty('remotetxid');
    expect(typeof response.body.remotetxid).toBe('string');

    // Verify the balance was increased by the deposit amount
    expect(response.body.balance).toBe(previousBalance + depositAmount);

    // Store the response for future tests
    sharedState.set('depositResponse-withoutToken', response.body);
  });

  // Test to deposit with valid payload and zero amount
  it('POST /api/relax/deposit should return valid response with proper payload and zero amount :SP:', async () => {
    // Check if we have data from the verify token test
    const hasVerifyTokenResponse = sharedState.has('verifyTokenResponse');
    if (!hasVerifyTokenResponse) {
      throw new Error('Verify token response not found in shared state');
    }

    // Get the verify token response from shared state
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');
    // Get the previous balance from shared state (now updated after the first deposit)
    const previousBalanceResponse = sharedState.get('depositResponse-withoutToken');
    const previousBalance = previousBalanceResponse.balance;

    // Create a valid payload based on the DepositRequestDto (without cashiertoken)
    const depositAmount = 0; // Deposit 0 units (0.00 in currency)
    const depositData = {
      gameid: 'casino',
      customerid: verifyTokenResponse.customerid,
      gamesessionid: 'round-123457',
      gameref: sharedState.get('launchUrlParams')?.gameid || 'moneytrain4',
      channel: sharedState.get('launchUrlParams')?.channel || 'web',
      clientid: 'web_windows',
      currency: verifyTokenResponse.customercurrency,
      // No cashiertoken here
      txid: Math.floor(Math.random() * 1000000), // Generate a random transaction ID
      amount: depositAmount,
      txtype: 'deposit',
      ended: true,
    };

    const req = request(baseUrl).post('/api/relax/deposit').send(depositData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    const response = await req.expect('Content-Type', /json/).expect(200);

    // Verify response structure based on DepositResponseDto
    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');

    expect(response.body).toHaveProperty('txid');
    expect(typeof response.body.txid).toBe('number');
    expect(response.body.txid).toBe(depositData.txid);

    expect(response.body).toHaveProperty('remotetxid');
    expect(typeof response.body.remotetxid).toBe('string');

    // Verify the balance was increased by the deposit amount
    expect(response.body.balance).toBe(previousBalance);
  });

  // Test with missing required fields
  it('POST /api/relax/deposit should return 400 with missing required fields', async () => {
    // Missing required 'amount' field
    const invalidData = {
      customerid: 'test-customer-id',
      currency: 'GC.',
    };

    const req = request(baseUrl).post('/api/relax/deposit').send(invalidData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(400);
  });

  // Test with invalid customer ID
  it('POST /api/relax/deposit should return 500 with invalid customer ID', async () => {
    const invalidCustomerData = {
      gameid: 'casino',
      customerid: '5553516e-496c-4ac7-a8c3-233723735c59', // Invalid customer ID
      gamesessionid: 'round-123456',
      gameref: 'moneytrain4',
      channel: 'web',
      clientid: 'web_windows',
      currency: 'GC.',
      txid: 12345,
      amount: 500,
      txtype: 'deposit',
      ended: false,
    };

    const req = request(baseUrl).post('/api/relax/deposit').send(invalidCustomerData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(500);
  });

  // Test with invalid channel value
  it('POST /api/relax/deposit should return 400 with invalid channel value', async () => {
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
      txid: 12345,
      amount: 500,
      txtype: 'deposit',
      ended: false,
    };

    const req = request(baseUrl).post('/api/relax/deposit').send(invalidChannelData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(400);
  });
});
