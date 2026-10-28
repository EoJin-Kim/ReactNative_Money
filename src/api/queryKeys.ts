/**
 * React Query 키 중앙 관리
 * 모든 query key는 여기서 관리합니다.
 */
export const queryKeys = {
  // 사용자 관련
  sampleGet: ['sample', 'get'] as const,
  samplePost: ['sample', 'post'] as const,
} as const;

