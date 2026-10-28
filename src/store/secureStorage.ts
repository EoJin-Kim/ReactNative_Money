import * as SecureStore from 'expo-secure-store'

export const SECURE_STORAGE_KEYS = {
    AUTH_TOKEN: 'authToken',
    REFRESH_TOKEN: 'refreshToken',
    NAME: 'name',
    SIMPLE_PASSWORD: 'simplePassword',
}

const SECURE_STORAGE_KEYS_ARRAY = [
    SECURE_STORAGE_KEYS.AUTH_TOKEN,
    SECURE_STORAGE_KEYS.REFRESH_TOKEN,
    SECURE_STORAGE_KEYS.NAME,
    SECURE_STORAGE_KEYS.SIMPLE_PASSWORD,
]

export const secureStorage = {
    getItem: async (name: string) => {
        try {
            const value = await SecureStore.getItemAsync(name)
            return value
        } catch (error) {
            console.error('❌ secureStorage.getItem 에러:', { name, error })
            throw error
        }
    },
    setItem: async (name: string, value: string) => {
        try {
            await SecureStore.setItemAsync(name, value)
        } catch (error) {
            console.error('❌ secureStorage.setItem 에러:', {
                name,
                value,
                error,
            })
            throw error
        }
    },
    clear: async () => {
        try {
            await Promise.all(
                SECURE_STORAGE_KEYS_ARRAY.map((key) =>
                    SecureStore.deleteItemAsync(key)
                )
            )
        } catch (error) {
            console.error('❌ secureStorage.clear 에러:', error)
            throw error
        }
    },
}
