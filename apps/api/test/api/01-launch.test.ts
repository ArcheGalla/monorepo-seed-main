import * as request from 'supertest';
import sharedState from './shared-state';
import envConfig from './env-config';

describe('Launch Flow', () => {
  // Clear shared state at the beginning of the test suite
  beforeAll(() => {
    sharedState.clear();
    // console.log('Cleared shared state before launch tests');
  });
  const baseUrl = `http://localhost:${envConfig.port}`;
  let jwtToken: string;

  // Test to get JWT token
  it('GET /api/demo/jwt should return JWT with valid payload :SP:', async () => {
    const response = await request(baseUrl)
      .get('/api/demo/jwt')
      .expect('Content-Type', /json/)
      .expect(200);

    // Verify response structure
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.length).toBeGreaterThan(0);

    // Save token for next test
    jwtToken = response.body.token;

    // Parse and validate JWT token
    const tokenParts = jwtToken.split('.');
    expect(tokenParts.length).toBe(3); // Header, payload, signature

    // Decode the payload (second part)
    const payloadBase64 = tokenParts[1];
    // Replace characters for base64 URL encoding
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    // Decode and parse as JSON
    const decodedPayload = JSON.parse(Buffer.from(base64, 'base64').toString());

    // Verify JWT payload fields
    expect(decodedPayload).toHaveProperty('sub');
    expect(decodedPayload.sub).toBe('2d63516e-496c-4ac7-a8c3-233723735c59');
    expect(decodedPayload).toHaveProperty('iat'); // Issued at timestamp
    expect(decodedPayload).toHaveProperty('exp'); // Expiration timestamp
    expect(decodedPayload.exp).toBeGreaterThan(decodedPayload.iat); // Expiration should be after issued at
  });

  // Test to launch a game with real money mode
  it('POST /api/relax/launch should return launch URL with moneymode=real and ticket :SP:', async () => {
    // Skip if JWT token wasn't obtained
    if (!jwtToken) {
      console.warn('JWT token not available, skipping test');
      return;
    }

    const launchData = {
      gameid: 'moneytrain4',
      channel: 'web',
      currency: 'GC.',
    };

    const response = await request(baseUrl)
      .post('/api/relax/launch')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(launchData)
      .expect('Content-Type', /json/)
      .expect(200);

    // Verify response structure
    expect(response.body).toHaveProperty('gameUrl');

    // Parse the URL to verify fragments
    const url = new URL(response.body.gameUrl);
    const params = new URLSearchParams(url.search);

    // Store URL parameters in shared state for use in other tests
    const urlParams = {
      gameid: params.get('gameid'),
      channel: params.get('channel'),
      partner: params.get('partner'),
      partnerid: params.get('partnerid'),
      moneymode: params.get('moneymode'),
      ticket: params.get('ticket'),
    };

    sharedState.set('launchUrlParams', urlParams);
    // console.log('Stored URL parameters in shared state:', urlParams);

    // Verify required URL parameters
    expect(urlParams.gameid).toBe(launchData.gameid);
    expect(urlParams.channel).toBe(launchData.channel);
    expect(urlParams.partner).toBeTruthy();
    expect(urlParams.partnerid).toBeTruthy();
    expect(urlParams.moneymode).toBe('real');
    expect(urlParams.ticket).toBeTruthy();
  });

  // Test to verify CORS headers are present for browser access
  it('POST /api/relax/launch should include CORS headers for browser access :SP:', async () => {
    // Skip if JWT token wasn't obtained
    if (!jwtToken) {
      console.warn('JWT token not available, skipping test');
      return;
    }

    const launchData = {
      gameid: 'moneytrain4',
      channel: 'web',
      currency: 'GC.',
    };

    const response = await request(baseUrl)
      .post('/api/relax/launch')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(launchData);

    // Verify CORS headers are present
    expect(response.headers).toHaveProperty('access-control-allow-origin');
    expect(response.headers).toHaveProperty('access-control-allow-methods');
    expect(response.headers).toHaveProperty('access-control-allow-headers');
    expect(response.headers).toHaveProperty('access-control-allow-credentials');

    // Verify CORS headers have correct values
    expect(response.headers['access-control-allow-methods']).toContain('POST');
    expect(response.headers['access-control-allow-headers']).toContain('Authorization');
    expect(response.headers['access-control-allow-headers']).toContain('Content-Type');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  // Test to verify OPTIONS preflight request handling
  it('OPTIONS /api/relax/launch should handle preflight requests correctly :SP:', async () => {
    const response = await request(baseUrl)
      .options('/api/relax/launch')
      .set('Origin', 'http://example.com')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'Authorization,Content-Type');

    // Verify response status is 200 for preflight
    expect(response.status).toBe(200);

    // Verify CORS headers are present
    expect(response.headers).toHaveProperty('access-control-allow-origin');
    expect(response.headers).toHaveProperty('access-control-allow-methods');
    expect(response.headers).toHaveProperty('access-control-allow-headers');
    expect(response.headers).toHaveProperty('access-control-allow-credentials');

    // Verify CORS headers have correct values
    expect(response.headers['access-control-allow-methods']).toContain('OPTIONS');
    expect(response.headers['access-control-allow-headers']).toContain('Authorization');
    expect(response.headers['access-control-allow-headers']).toContain('Content-Type');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });
});
