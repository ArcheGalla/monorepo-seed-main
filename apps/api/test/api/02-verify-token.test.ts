import * as request from 'supertest';
import sharedState from './shared-state';
import envConfig from './env-config';

describe('Verify Token Flow', () => {
  const baseUrl = `http://localhost:${envConfig.port}`;

  // Test to verify a token
  it('POST /api/relax/verifyToken should return valid response with proper payload :SP:', async () => {
    // Check if we have URL parameters from the launch test
    const hasLaunchParams = sharedState.has('launchUrlParams');
    // console.log('Shared state has launchUrlParams:', hasLaunchParams);

    // Define the type for launch parameters
    interface LaunchParams {
      gameid?: string;
      channel?: string;
      partner?: string;
      partnerid?: string;
      moneymode?: string;
      ticket?: string;
    }

    let launchParams: LaunchParams = {};
    if (hasLaunchParams) {
      launchParams = sharedState.get('launchUrlParams');
      // console.log('Retrieved URL parameters from shared state:', launchParams);
    } else {
      console.warn('No launch parameters found in shared state, using defaults');
    }

    // Create a valid payload based on the VerifyTokenRequestDto and launch parameters
    const verifyTokenData = {
      channel: launchParams.channel || 'web',
      clientid: 'web_windows',
      token: launchParams.ticket || 'test_token_123456',
      gameref: launchParams.gameid || 'moneytrain4', // Optional field
    };

    const req = request(baseUrl).post('/api/relax/verifyToken').send(verifyTokenData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    const response = await req.expect('Content-Type', /json/).expect(200);

    // Verify response structure based on VerifyTokenResponseDto
    expect(response.body).toHaveProperty('customerid');
    expect(typeof response.body.customerid).toBe('string');
    expect(response.body.customerid.length).toBeLessThanOrEqual(40);

    expect(response.body).toHaveProperty('countrycode');
    expect(typeof response.body.countrycode).toBe('string');
    expect(response.body.countrycode.length).toBe(2);

    expect(response.body).toHaveProperty('cashiertoken');
    expect(typeof response.body.cashiertoken).toBe('string');
    expect(response.body.cashiertoken.length).toBeLessThanOrEqual(1024);

    expect(response.body).toHaveProperty('customercurrency');
    expect(typeof response.body.customercurrency).toBe('string');
    expect(response.body.customercurrency.length).toBe(3);

    expect(response.body).toHaveProperty('balance');
    expect(typeof response.body.balance).toBe('number');

    expect(response.body).toHaveProperty('jurisdiction');
    expect(typeof response.body.jurisdiction).toBe('string');

    // Store the response for future tests
    sharedState.set('verifyTokenResponse', response.body);
  });

  // Test with invalid token
  it('POST /api/relax/verifyToken should return 401 with invalid token', async () => {
    // Define the type for launch parameters (same as above)
    interface LaunchParams {
      gameid?: string;
      channel?: string;
      partner?: string;
      partnerid?: string;
      moneymode?: string;
      ticket?: string;
    }

    const launchParams: LaunchParams = sharedState.get('launchUrlParams') || {};

    const invalidTokenData = {
      channel: launchParams.channel || 'web',
      clientid: 'web_windows',
      token: '55558400-e29b-41d4-a716-446655440000',
      gameref: launchParams.gameid || 'moneytrain4',
    };

    const req = request(baseUrl).post('/api/relax/verifyToken').send(invalidTokenData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(401);
  });

  // Test with missing required fields
  it('POST /api/relax/verifyToken should return 400 with missing required fields', async () => {
    // Missing required 'token' field
    const invalidData = {
      channel: 'web',
      clientid: 'web_windows',
    };

    const req = request(baseUrl).post('/api/relax/verifyToken').send(invalidData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(400);
  });

  // Test with invalid channel value
  it('POST /api/relax/verifyToken should return 400 with invalid channel value', async () => {
    const invalidChannelData = {
      channel: 'invalid_channel', // Only 'web' or 'mobile' are valid
      clientid: 'web_windows',
      token: 'test_token_123456',
    };

    const req = request(baseUrl).post('/api/relax/verifyToken').send(invalidChannelData);

    // Add basic auth if enabled
    if (envConfig.basicAuthEnabled) {
      req.auth(envConfig.basicAuthUsername, envConfig.basicAuthPassword);
    }

    await req.expect('Content-Type', /json/).expect(400);
  });
});
