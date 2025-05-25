import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Get environment variables with defaults
 */
export const getEnvConfig = () => {
  return {
    port: process.env.PORT || '3000',
    basicAuthEnabled: process.env.BASIC_AUTH_ENABLED === '1',
    basicAuthUsername: process.env.BASIC_AUTH_USERNAME || '',
    basicAuthPassword: process.env.BASIC_AUTH_PASSWORD || '',
  };
};

export default getEnvConfig();
