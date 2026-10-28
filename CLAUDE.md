# React Native Template 프로젝트 가이드

## 프로젝트 개요

Expo 기반 React Native 템플릿 프로젝트입니다. POC Bank 아키텍처를 기반으로 구조화되어 있습니다.

## 기술 스택

- **프레임워크**: React Native (Expo ~54.0)
- **언어**: TypeScript (~5.9)
- **상태 관리**: Zustand (클라이언트), React Query (서버)
- **네비게이션**: React Navigation (Stack, Bottom Tabs)
- **스타일링**: NativeWind (Tailwind CSS)
- **네트워크**: Axios
- **보안 저장소**: expo-secure-store

## 디렉토리 구조

```
src/
├── api/                    # API 클라이언트 및 설정
│   ├── axios/              # Axios 인스턴스 설정
│   ├── logger.ts           # API 로깅
│   └── queryKeys.ts        # React Query 키 관리
│
├── components/             # 재사용 UI 컴포넌트
│   ├── button/             # 버튼 컴포넌트
│   ├── card/               # 카드 컴포넌트
│   ├── input/              # 입력 컴포넌트
│   ├── loading/            # 로딩 컴포넌트
│   └── modal/              # 모달 컴포넌트
│
├── constants/              # 앱 전역 상수
├── deeplink/               # 딥링크 처리
├── hooks/                  # 커스텀 훅
│   ├── api/                # React Query 훅
│   ├── auth/               # 인증 관련 훅
│   ├── dialog/             # 다이얼로그 훅
│   ├── router/             # 네비게이션 훅
│   └── util/               # 유틸리티 훅
│
├── navigation/             # 네비게이션 설정
│   ├── NavigationTypes.ts  # 라우트 타입 및 MENU 상수
│   ├── RootNavigator.tsx   # 루트 네비게이터
│   └── Router.ts           # 네비게이션 유틸리티
│
├── providers/              # Context Provider
│   ├── AuthCheckProvider.tsx
│   ├── ComposeProviders.tsx
│   ├── DeeplinkProvider.tsx
│   ├── DialogProvider.tsx
│   ├── LoadingProvider.tsx
│   ├── QueryProvider.tsx
│   └── ToastProvider.tsx
│
├── screens/                # 화면 컴포넌트
│   ├── [feature]/
│   │   ├── [Feature]Screen.tsx
│   │   └── use[Feature]Screen.ts
│
├── services/               # API 서비스 함수
├── store/                  # Zustand 스토어
├── types/                  # TypeScript 타입 정의
└── utils/                  # 유틸리티 함수
```

## 코딩 컨벤션

### 화면 컴포넌트 패턴

**필수**: 모든 화면은 UI와 로직을 분리합니다.

```typescript
// ✅ 올바른 패턴
// FeatureScreen.tsx - UI만 담당
export default function FeatureScreen() {
  const { data, handlers } = useFeatureScreen();
  return <View>{/* UI */}</View>;
}

// useFeatureScreen.ts - 비즈니스 로직
export function useFeatureScreen() {
  // 상태 관리, 이벤트 핸들러, 비즈니스 로직
  return { data, handlers };
}
```

### 네비게이션

```typescript
import Router from '@/src/navigation/Router';
import { MENU } from '@/src/navigation/NavigationTypes';

// 화면 이동
Router.moveToMenu(MENU.USER.PROFILE, { userId: '123' });

// 뒤로가기
Router.pop();

// 메인으로 이동 (스택 리셋)
Router.moveToMain();
```

### 새 화면 추가 절차

1. `src/navigation/NavigationTypes.ts`에 MENU 및 파라미터 타입 추가
2. `src/screens/[feature]/` 폴더 생성
3. `[Feature]Screen.tsx` 및 `use[Feature]Screen.ts` 생성
4. `src/navigation/RootNavigator.tsx`에 화면 등록

### 스타일링 (NativeWind)

Tailwind CSS 클래스를 사용합니다.

```tsx
<View className="flex-1 bg-white p-4">
  <Text className="font16sb text-black">제목</Text>
  <Text className="font14r text-[#666]">내용</Text>
</View>
```

#### 폰트 유틸리티 클래스

`tailwind.plugin.font-styles.js`에서 자동 생성됩니다.

- **형식**: `font{크기}{스타일}`
- **크기**: 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32
- **스타일**: r(Regular), m(Medium), sb(SemiBold), b(Bold)
- **예시**: `font14r`, `font16sb`, `font24b`

### Provider 사용

```typescript
import { useToast } from '@/src/providers/ToastProvider';
import { useLoading } from '@/src/providers/LoadingProvider';
import { useDialog } from '@/src/hooks/dialog/useDialog';

// 토스트
const { showToast } = useToast();
showToast('메시지', 'success'); // success, error, info

// 로딩
const { showLoading, hideLoading } = useLoading();

// 다이얼로그
const { alert, confirm } = useDialog();
await alert('알림', '내용');
const result = await confirm('확인', '진행하시겠습니까?');
```

### React Query 사용

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryKeys } from '@/src/api/queryKeys';

// 조회
const { data, isLoading } = useQuery({
  queryKey: queryKeys.user.detail(userId),
  queryFn: () => fetchUser(userId),
});

// 변경
const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
  },
});
```

### Zustand 스토어

```typescript
import { useGlobalStore } from '@/src/store/useGlobalStore';

// 사용
const { user, setUser } = useGlobalStore();
```

## Path Alias

`@/*` → `src/*`

```typescript
import Router from '@/src/navigation/Router';
import { useToast } from '@/src/providers/ToastProvider';
```

## 주요 파일

| 파일 | 설명 |
|------|------|
| `App.tsx` | 앱 진입점, Provider 구성 |
| `tailwind.config.js` | Tailwind 설정 |
| `tailwind.plugin.font-styles.js` | 폰트 유틸리티 플러그인 |
| `src/navigation/NavigationTypes.ts` | 라우트 정의 |
| `src/navigation/Router.ts` | 네비게이션 유틸리티 |
| `src/providers/` | 전역 Provider들 |

## 규칙

1. **화면 로직 분리**: 모든 화면은 `useXxxScreen` 훅으로 로직 분리 필수
2. **Router 사용**: 네비게이션은 항상 `Router` 유틸리티 사용
3. **NativeWind 스타일링**: 인라인 스타일 대신 className 사용
4. **한국어 응답**: 모든 응답은 한국어로 작성
5. **기존 패턴 준수**: 새 코드는 기존 코드 스타일과 일관성 유지
