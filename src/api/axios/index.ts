// Export all API clients
export { default as sampleClient } from './sampleClient'

// Export config utilities for creating new clients
export { createAxiosInstance, getEnvVar } from './config'
export type { ApiClientConfig } from './config'

// Example: To add a new API client
// 1. Create a new file: lib/axios/newApiClient.ts
// 2. Use createAxiosInstance with new baseURL from .env
// 3. Export it here
// export { default as newApiClient } from './newApiClient';
