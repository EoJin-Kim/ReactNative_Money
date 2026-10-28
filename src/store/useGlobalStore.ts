import { create } from 'zustand'
import { SECURE_STORAGE_KEYS, secureStorage } from './secureStorage'

type GlobalState = {
    // secureStorage 상태
    clear: () => Promise<void>
    getAuthToken: () => Promise<string>
    setAuthToken: (token: string) => Promise<void>
    getRefreshToken: () => Promise<string>
    setRefreshToken: (token: string) => Promise<void>
    getSimplePassword: () => Promise<string>
    setSimplePassword: (password: string) => Promise<void>
    
}

export const useGlobalStore = create<GlobalState>((set, get) => {
    // 메모리에만 저장
    let _memoryStorage: string = ''

    const clear = async () => {
        // 메모리 상태 초기화
        _memoryStorage = ''

        // SecureStorage 초기화
        await secureStorage.clear()
    }

    const getAuthToken = async () => {
        return (
            (await secureStorage.getItem(SECURE_STORAGE_KEYS.AUTH_TOKEN)) || ''
        )
    }

    const setAuthToken = async (token: string) => {
        await secureStorage.setItem(SECURE_STORAGE_KEYS.AUTH_TOKEN, token)
    }

    const getRefreshToken = async (): Promise<string> => {
        return (
            (await secureStorage.getItem(SECURE_STORAGE_KEYS.REFRESH_TOKEN)) ||
            ''
        )
    }

    const setRefreshToken = async (token: string): Promise<void> => {
        await secureStorage.setItem(SECURE_STORAGE_KEYS.REFRESH_TOKEN, token)
    }
    const getSimplePassword = async () => {
        return (
            (await secureStorage.getItem(
                SECURE_STORAGE_KEYS.SIMPLE_PASSWORD
            )) || ''
        )
    }
    const setSimplePassword = async (password: string) => {
        await secureStorage.setItem(
            SECURE_STORAGE_KEYS.SIMPLE_PASSWORD,
            password
        )
    }



    return {
        // secureStorage 상태
        clear,
        getAuthToken,
        setAuthToken,
        getRefreshToken,
        setRefreshToken,
        getSimplePassword,
        setSimplePassword,

        // 메모리 상태
    }
})
