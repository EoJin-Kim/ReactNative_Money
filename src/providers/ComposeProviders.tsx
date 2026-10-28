import React from 'react';

/**
 * Provider 합성 유틸리티
 * 여러 Provider를 중첩하여 구성합니다.
 * 첫 번째 Provider가 가장 바깥쪽, 마지막 Provider가 가장 안쪽입니다.
 */
export function composeProviders(
  ...providers: Array<React.ComponentType<{ children: React.ReactNode }>>
) {
  return ({ children }: { children: React.ReactNode }) => {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      <>{children}</>
    );
  };
}

