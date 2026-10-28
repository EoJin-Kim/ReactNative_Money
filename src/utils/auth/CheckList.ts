// utils/authChecklist.ts

// ✅ 1. 체크리스트 항목 정의
export enum CheckList {
    Check1 = 'check1',
    Check2 = 'check2',
    Check3 = 'check3',
    Check4 = 'check4',
}

// ✅ 2. 인증 유형(enum or string union으로 정의 가능)
export enum AuthType {
    KYC_AUTH = 'KYC_AUTH',
    EMAIL_AUTH = 'EMAIL_AUTH',
    PHONE_AUTH = 'PHONE_AUTH',
}

// ✅ 3. 인증 유형별 필요한 체크리스트 매핑
export const AuthList: Record<AuthType, CheckList[]> = {
    [AuthType.KYC_AUTH]: [CheckList.Check1, CheckList.Check2],
    [AuthType.EMAIL_AUTH]: [CheckList.Check3],
    [AuthType.PHONE_AUTH]: [CheckList.Check2, CheckList.Check4],
}

// ✅ 4. 인증 유형에 따라 체크리스트 반환하는 함수
export function getAuthCheckList(authType: AuthType): CheckList[] {
    return AuthList[authType].slice()
}
