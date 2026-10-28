import { createContext, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { CheckList } from '@/src/utils/auth/CheckList'

export function AuthCheckProvider({ children }: { children: React.ReactNode }) {
    const [notAuth, setNotAuth] = useState<CheckList | null>(null)

    useEffect(() => {
        if (notAuth) {
            console.warn('🚨 권한 실패 감지:', notAuth)

            switch (notAuth) {
                case CheckList.Check1:
                    Alert.alert('에러', '권한 체크 1 에러', [
                        {
                            text: '확인',
                            onPress: () => clearAuth(),
                        },
                    ])
                    break
                case CheckList.Check2:
                    Alert.alert('에러', '권한 체크 2 에러', [
                        {
                            text: '확인',
                            onPress: () => clearAuth(),
                        },
                    ])
                    break
                case CheckList.Check3:
                    Alert.alert('에러', '권한 체크 3 에러', [
                        {
                            text: '확인',
                            onPress: () => clearAuth(),
                        },
                    ])
                    break
                case CheckList.Check4:
                    Alert.alert('에러', '권한 체크 4 에러', [
                        {
                            text: '확인',
                            onPress: () => clearAuth(),
                        },
                    ])
                    break
            }
        }
    }, [notAuth])

    function clearAuth() {
        setNotAuth(null)
    }

    return (
        <AuthCheckContext.Provider value={{ notAuth, setNotAuth }}>
            {children}
        </AuthCheckContext.Provider>
    )
}

type AuthCheckContextType = {
    notAuth: CheckList | null
    setNotAuth: (check: CheckList | null) => void
}

const AuthCheckContext = createContext<AuthCheckContextType | null>(null)

export function useAuthContext() {
    const ctx = useContext(AuthCheckContext)
    if (!ctx)
        throw new Error('useAuthContext must be used within AuthCheckProvider')
    return ctx
}
