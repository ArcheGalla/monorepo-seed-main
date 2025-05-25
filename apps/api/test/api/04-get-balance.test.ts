import * as request from 'supertest';
import sharedState from './shared-state';
import envConfig from './env-config';

describe('Get Balance Flow', () => {
  const baseUrl = `http://localhost:${envConfig.port}`;

  // Test to get balance with valid payload
  it('POST /api/relax/getBalance should return valid response with proper payload :SP:', async () => {
    // Check if we have data from the verify token test
    const hasVerifyTokenResponse = sharedState.has('verifyTokenResponse');
    if (!hasVerifyTokenResponse) {
      throw new Error('Verify token response not found in shared state');
    }

    // Get the verify token response from shared state
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');

    // Create a valid payload based on the GetBalanceRequestDto
    const getBalanceData = {
      customerid: verifyTokenResponse.customerid,
      cashiertoken: verifyTokenResponse.cashiertoken,
      currency: verifyTokenResponse.customercurrency,
      gameref: sharedState.get('launchUrlParams')?.gameid || 'moneytrain4',
      channel: sharedState.get('launchUrlParams')?.channel || 'web',
    };

    const req = request(baseUrl).post('/api/relax/getBalance').send(getBalanceData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    const response = await req.expect('Content-Type', /json/).expect(200);

    // Verify response structure based on GetBalanceResponseDto
    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');

    expect(response.body).toHaveProperty('customercurrency');
    expect(typeof response.body.customercurrency).toBe('string');
    expect(response.body.customercurrency.length).toBe(3);

    // Verify the currency matches what we sent
    expect(response.body.customercurrency).toBe(getBalanceData.currency);

    sharedState.set('getBalanceResponse-01', response.body);
  });

  // Test with missing required fields
  it('POST /api/relax/getBalance should return 400 with missing required fields', async () => {
    // Missing required 'customerid' field
    const invalidData = {
      currency: 'GC.',
    };

    const req = request(baseUrl).post('/api/relax/getBalance').send(invalidData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(400);
  });

  // Test with invalid customer ID
  it('POST /api/relax/getBalance should return 404 with invalid customer ID', async () => {
    const invalidCustomerData = {
      customerid: '5553516e-496c-4ac7-a8c3-233723735c59', //'invalid-customer-id',
      currency: 'GC.',
    };

    const req = request(baseUrl).post('/api/relax/getBalance').send(invalidCustomerData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(404);
  });

  // Test with invalid channel value
  it('POST /api/relax/getBalance should return 400 with invalid channel value', async () => {
    // Get the verify token response from shared state
    const verifyTokenResponse = sharedState.get('verifyTokenResponse');

    const invalidChannelData = {
      customerid: verifyTokenResponse.customerid,
      currency: verifyTokenResponse.customercurrency,
      channel: 'invalid_channel', // Only 'web' or 'mobile' are valid
    };

    const req = request(baseUrl).post('/api/relax/getBalance').send(invalidChannelData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(400);
  });
});
