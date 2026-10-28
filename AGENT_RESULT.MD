# 프로젝트 구조 설정 결과

POC Bank 아키텍처를 기반으로 프로젝트 구조를 성공적으로 설정했습니다.

## 완료된 작업

### 1. 패키지 의존성 추가

`package.json`에 다음 라이브러리들을 추가했습니다:

- **상태 관리**: `@tanstack/react-query` (^5.90.8), `zustand` (^5.0.8)
- **네비게이션**: `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs`
- **스타일링**: `nativewind` (^4.2.1), `tailwindcss` (^3.4.18)
- **네트워크**: `axios` (^1.13.2)
- **Expo 패키지**: `expo-secure-store`, `expo-linking`, `expo-camera`, `expo-image`, `expo-linear-gradient`
- **기타**: `react-native-reanimated`, `react-native-safe-area-context`, `react-native-screens`, `react-native-gesture-handler`

### 2. 디렉토리 구조 생성

다음 디렉토리 구조를 생성했습니다:

```
src/
├── api/                    # API 클라이언트 및 설정
│   ├── axios/              # Axios 인스턴스 및 설정
│   ├── logger.ts           # API 로깅 유틸리티
│   └── queryKeys.ts        # React Query 키 중앙 관리
│
├── components/             # 재사용 가능한 UI 컴포넌트
│   ├── button/             # 버튼 컴포넌트
│   ├── card/               # 카드 컴포넌트
│   └── input/              # 입력 컴포넌트
│
├── constants/              # 앱 전역 상수
│   └── theme.ts            # 테마 상수
│
├── hooks/                  # 커스텀 훅
│   ├── api/                # React Query 훅
│   └── router/             # 네비게이션 관련 훅
│
├── navigation/             # 네비게이션 설정
│   ├── NavigationTypes.ts  # 라우트 타입 및 MENU 상수
│   ├── RootNavigator.tsx   # 루트 네비게이터
│   └── Router.ts           # 네비게이션 유틸리티
│
├── providers/              # Context Provider
│   ├── ComposeProviders.tsx # Provider 합성 유틸리티
│   ├── DeeplinkProvider.tsx
│   ├── LoadingProvider.tsx
│   ├── QueryProvider.tsx
│   └── ToastProvider.tsx
│
├── screens/                # 화면 컴포넌트
│   ├── auth/               # 인증 화면
│   │   ├── AuthScreen.tsx
│   │   ├── useAuthScreen.ts
│   │   ├── LoginScreen.tsx
│   │   └── useLoginScreen.ts
│   ├── intro/               # 인트로 화면
│   │   ├── IntroScreen.tsx
│   │   └── useIntroScreen.ts
│   ├── main/               # 메인 화면
│   │   ├── MainScreen.tsx
│   │   ├── useMainScreen.ts
│   │   ├── HomeScreen.tsx
│   │   └── useHomeScreen.ts
│   └── user/               # 사용자 화면
│       ├── UserScreen.tsx
│       ├── useUserScreen.ts
│       ├── ProfileScreen.tsx
│       └── useProfileScreen.ts
│
├── services/               # API 서비스 함수
│   └── bnkPoc/             # BNK POC 백엔드 API
│       ├── authApi.ts
│       └── userApi.ts
│
├── store/                  # Zustand 스토어
│   ├── useGlobalStore.ts   # 전역 상태 스토어
│   └── secureStorage.ts    # 보안 저장소 유틸리티
│
├── types/                  # TypeScript 타입 정의
│   └── api/                # API 타입
│
└── utils/                  # 유틸리티 함수
    ├── Logger.ts           # 로깅 유틸리티
    └── string.ts           # 문자열 유틸리티
```

### 3. Provider 구현

다음 Provider들을 구현했습니다:

#### QueryProvider
- React Query 클라이언트 설정
- Stale time: 5분, GC time: 10분
- Retry: 1회, Window focus refetch: 비활성화

#### LoadingProvider
- 전역 로딩 오버레이 관리
- `useLoading` 훅 제공

#### ToastProvider
- 토스트 알림 시스템
- success, error, info 타입 지원
- `useToast` 훅 제공

#### DeeplinkProvider
- 딥링크 처리 시스템
- Expo Linking을 사용한 딥링크 수신

#### ComposeProviders
- 여러 Provider를 중첩하여 구성하는 유틸리티

### 4. 네비게이션 시스템

#### NavigationTypes.ts
- 라우트 경로 상수 (`MENU`) 정의
  - `MENU.INTRO.INDEX`: 인트로 화면
  - `MENU.MAIN.*`: 메인 관련 화면
  - `MENU.USER.*`: 사용자 관련 화면
  - `MENU.AUTH.*`: 인증 관련 화면
- `RootStackParamList` 타입 정의
- 화면 간 결과 전달 타입 정의

#### Router.ts
- 중앙화된 네비게이션 유틸리티
- `moveToMenu`, `replaceToMenu`, `pop`, `popToMenu`, `moveToMain` 메서드 제공
- 네비게이션 준비 상태 확인 및 재시도 로직

#### RootNavigator.tsx
- React Navigation Stack Navigator 설정
- 모든 화면 등록 (초기 라우트: `MENU.INTRO.INDEX`)
- IntroScreen, MainScreen, HomeScreen, UserScreen, ProfileScreen, AuthScreen, LoginScreen 등록

### 5. API 레이어

#### Axios 설정
- `createAxiosInstance` 팩토리 함수
- Request/Response 인터셉터
- 자동 로깅 및 에러 처리

#### 서비스 레이어
- `authApi.ts`: 인증 관련 API (login, logout, getMe, refreshToken)
- `userApi.ts`: 사용자 관련 API (getUsers, getUser, updateUser, deleteUser)

#### React Query 훅
- `useAuthApi.ts`: 인증 관련 훅 (useMe, useLogin, useLogout)
- `useUserApi.ts`: 사용자 관련 훅 (useUsers, useUser, useUpdateUser, useDeleteUser)

#### Query Keys
- 중앙화된 query key 관리 (`queryKeys.ts`)

### 6. 샘플 화면 및 커스텀 훅

다음 샘플 화면들과 각 화면별 커스텀 훅을 생성했습니다:

#### 화면 목록
- **IntroScreen**: 인트로 화면 (앱 시작 화면)
- **MainScreen**: 메인 화면 (토스트, 로딩 테스트 포함)
- **HomeScreen**: 홈 화면
- **UserScreen**: 사용자 목록 화면 (React Query 사용 예시)
- **ProfileScreen**: 사용자 프로필 화면
- **AuthScreen**: 인증 화면
- **LoginScreen**: 로그인 화면 (폼 처리 예시)

#### 커스텀 훅 패턴
각 화면은 비즈니스 로직을 커스텀 훅으로 분리하여 구현했습니다:

- **useIntroScreen**: 인트로 화면 로직
- **useMainScreen**: 메인 화면 로직
- **useHomeScreen**: 홈 화면 로직
- **useUserScreen**: 사용자 목록 화면 로직
- **useProfileScreen**: 프로필 화면 로직
- **useAuthScreen**: 인증 화면 로직
- **useLoginScreen**: 로그인 화면 로직

#### 화면 컴포넌트 구조
```typescript
// Screen 컴포넌트 (UI만 담당)
export default function MyScreen() {
  const { data, handlers } = useMyScreen();
  return <View>{/* UI */}</View>;
}

// Hook (비즈니스 로직)
export function useMyScreen() {
  // 상태 관리
  // 이벤트 핸들러
  // 비즈니스 로직
  return { data, handlers };
}
```

이 패턴을 통해 관심사의 분리(Separation of Concerns)를 달성하고, 재사용성과 테스트 가능성을 향상시켰습니다.

### 7. 샘플 컴포넌트

- **PrimaryButton**: 기본 버튼 컴포넌트
- **SecondaryButton**: 보조 버튼 컴포넌트
- **Card**: 카드 컴포넌트
- **TextInput**: 커스텀 입력 컴포넌트

### 8. 상태 관리

#### Zustand Store
- `useGlobalStore`: 전역 상태 스토어
- SecureStorage와 통합된 영구 저장소

### 9. 설정 파일

#### tsconfig.json
- Path alias 설정 (`@/*` → `src/*`)
- Strict mode 활성화

#### babel.config.js
- NativeWind babel preset 설정

#### tailwind.config.js
- Tailwind CSS 설정

#### global.css
- Tailwind CSS 기본 스타일

### 10. App.tsx 업데이트

- 모든 Provider 적용
- RootNavigator 통합
- NativeWind 스타일 import

## 사용 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 네비게이션 사용

```typescript
import { Router } from '@/navigation/Router';
import { MENU } from '@/navigation/NavigationTypes';

// 화면 이동
Router.moveToMenu(MENU.USER.PROFILE, { userId: '123' });

// 뒤로가기
Router.pop();
```

### 3. React Query 사용

```typescript
import { useUsers } from '@/hooks/api/useUserApi';

function MyComponent() {
  const { data, isLoading, error } = useUsers();
  // ...
}
```

### 4. Provider 사용

```typescript
import { useToast } from '@/providers/ToastProvider';
import { useLoading } from '@/providers/LoadingProvider';

function MyComponent() {
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();
  
  showToast('메시지', 'success');
  showLoading();
  // ...
  hideLoading();
}
```

## 다음 단계

1. **환경 변수 설정**: `.env` 파일에 API base URL 설정
2. **실제 API 연동**: 서비스 레이어의 API 엔드포인트를 실제 백엔드와 연동
3. **인증 로직 구현**: 토큰 저장 및 관리 로직 추가
4. **에러 처리 강화**: 전역 에러 핸들러 구현
5. **테스트 작성**: 단위 테스트 및 통합 테스트 추가

## 참고사항

- 모든 네비게이션은 `Router` 유틸리티를 통해 수행해야 합니다.
- 스타일링은 NativeWind (Tailwind CSS)를 사용합니다.
- API 호출은 React Query를 통해 관리됩니다.
- 전역 상태는 Zustand를 사용합니다.
- **화면 컴포넌트는 UI만 담당하고, 비즈니스 로직은 커스텀 훅으로 분리합니다.**
- **각 화면은 `use[ScreenName]Screen` 패턴의 커스텀 훅을 가집니다.**

## 추가 완료 사항

### IntroScreen 추가
- 인트로 화면(`IntroScreen.tsx`) 생성
- `useIntroScreen` 커스텀 훅 생성
- NavigationTypes에 INTRO 라우트 추가
- RootNavigator에 IntroScreen 등록 및 초기 라우트로 설정

### 화면별 커스텀 훅 적용
모든 화면에 커스텀 훅을 적용하여 비즈니스 로직과 UI를 분리했습니다:
- 각 화면 컴포넌트는 UI 렌더링만 담당
- 모든 비즈니스 로직은 해당 화면의 커스텀 훅에서 관리
- 훅은 `data`와 `handlers` 객체를 반환하여 화면에서 사용

