import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios'
import { useGlobalStore } from '@/src/store/useGlobalStore'
import Router from '@/src/navigation/Router'
import { loadingManager } from '@/src/utils/loadingManager'
import { networkLogger } from '../logger'

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

// Refresh 완료 후 구독자들에게 알림
const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token))
    refreshSubscribers = []
}

// Refresh 구독자 추가
const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback)
}

// TypeScript 타입 확장
declare module 'axios' {
    export interface AxiosRequestConfig {
        /** 전역 로딩 표시 건너뛰기 (풀다운 새로고침, 무한스크롤 등) */
        skipLoading?: boolean
    }
    export interface InternalAxiosRequestConfig {
        metadata?: {
            startTime: number
        }
        /** 전역 로딩 표시 건너뛰기 (풀다운 새로고침, 무한스크롤 등) */
        skipLoading?: boolean
    }
}

export interface ApiClientConfig {
    baseURL: string
    timeout?: number
    headers?: Record<string, string>
}

// Request Interceptor Factory
export const createRequestInterceptor = () => {
    const onFulfilled = async (
        config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
        // 요청 시작 시간 기록
        config.metadata = { startTime: Date.now() }

        // 로딩 시작 (skipLoading 옵션이 없을 때만)
        if (!config.skipLoading) {
            loadingManager.startLoading()
        }

        // 네트워크 요청 로깅 (두 단계 체크: __DEV__ && 토글 설정)
        // const { showNetworkInfo } = useDevToolsStore.getState()
        networkLogger.request(
            config.method || 'get',
            config.url || '',
            config.data,
            // __DEV__ && showNetworkInfo
            __DEV__
        )

        // Authorization Bearer 토큰 설정
        const token = await useGlobalStore.getState().getAuthToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }

    const onRejected = (error: AxiosError): Promise<AxiosError> => {
        // 로딩 종료 (skipLoading 옵션이 없을 때만)
        if (!error.config?.skipLoading) {
            loadingManager.endLoading()
        }

        // const { showNetworkError } = useDevToolsStore.getState()
        networkLogger.error(
            'request',
            'unknown',
            error,
            // __DEV__ && showNetworkError
            __DEV__
        )

        return Promise.reject(error)
    }

    return { onFulfilled, onRejected }
}

// Response Interceptor Factory
export const createResponseInterceptor = (instance: AxiosInstance) => {
    const onFulfilled = (response: AxiosResponse): AxiosResponse => {
        // 로딩 종료 (skipLoading 옵션이 없을 때만)
        if (!response.config?.skipLoading) {
            loadingManager.endLoading()
        }

        // 응답 시간 계산
        const duration = response.config.metadata?.startTime
            ? Date.now() - response.config.metadata.startTime
            : undefined

        // 네트워크 응답 로깅 (두 단계 체크: __DEV__ && 토글 설정)
        // const { showNetworkInfo } = useDevToolsStore.getState()
        networkLogger.response(
            response.config.method || 'get',
            response.config.url || '',
            response.status,
            duration,
            // __DEV__ && showNetworkInfo
            __DEV__
        )

        // 응답 데이터 로깅
        networkLogger.responseData(
            response.data,
            // __DEV__ && showNetworkInfo,
            __DEV__,
            response.config.url
        )

        return response
    }

    const onRejected = async (error: AxiosError): Promise<AxiosError> => {
        // 로딩 종료 (skipLoading 옵션이 없을 때만)
        if (!error.config?.skipLoading) {
            loadingManager.endLoading()
        }

        // 에러 로깅 (두 단계 체크: __DEV__ && 토글 설정)
        // const { showNetworkError } = useDevToolsStore.getState()
        const { config, response } = error

        networkLogger.error(
            error.config?.method || 'unknown',
            error.config?.url || 'unknown',
            error,
            // __DEV__ && showNetworkError
            __DEV__
        )

        // 원래 요청 저장
        const originalRequest = config
        
        // 추후 적용
        // const authTokenValue = await useGlobalStore.getState().getAuthToken()

        // // 401: 토큰 시간 만료 & 로그인 가능 세션 갯수 초과
        // const responseData = response?.data as { reason?: string } | undefined
        // if (
        //     response?.status === 401 &&
        //     responseData?.reason === 'ACCESS_TOKEN_EXPIRED' &&
        //     originalRequest
        // ) {
        //     if (!isRefreshing) {
        //         isRefreshing = true
        //         console.log('🔄 Refreshing token...')

        //         try {
        //             const refreshTokenValue = await useGlobalStore
        //                 .getState()
        //                 .getRefreshToken()

        //             if (!refreshTokenValue) {
        //                 throw new Error('Refresh token not found')
        //             }

        //             // authApi.refreshToken을 사용하되, 순환 참조를 피하기 위해 별도의 axios 인스턴스 사용
        //             const { data } = await refreshAxiosInstance.post<{
        //                 accessToken: string
        //                 refreshToken: string
        //             }>('/api/auth/refresh', {
        //                 refreshToken: refreshTokenValue,
        //             })

        //             const newAccessToken = data.accessToken
        //             const newRefreshToken = data.refreshToken

        //             // 새 토큰들 저장
        //             await useGlobalStore.getState().setAuthToken(newAccessToken)
        //             if (newRefreshToken) {
        //                 await useGlobalStore
        //                     .getState()
        //                     .setRefreshToken(newRefreshToken)
        //             }

        //             isRefreshing = false
        //             onRefreshed(newAccessToken)
        //             console.log('🔄 Completed Refreshing token...')

        //             // 실패했던 요청에 새 토큰 설정 후 재요청
        //             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        //             return instance.request(originalRequest) as any
        //         } catch (refreshError) {
        //             isRefreshing = false
        //             console.log('🔄 Failed to Refreshing token...')
        //             // refresh 실패 시 토큰 삭제
        //             await useGlobalStore.getState().clear()
        //             Router.restart()
        //             return Promise.reject(refreshError)
        //         }
        //     }

        //     // refresh 중인 동안 들어온 요청은 큐에 저장했다가 refresh 끝나면 실행
        //     return new Promise((resolve) => {
        //         addRefreshSubscriber((newAccessToken) => {
        //             if (originalRequest) {
        //                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        //                 resolve(axios(originalRequest) as any)
        //             }
        //         })
        //     }) as any
        // } else if (authTokenValue != '' && response?.status === 401) {
        //     await useGlobalStore.getState().clear()
        //     Router.restart()
        //     return Promise.reject(error)
        // }

        return Promise.reject(error)
    }

    return { onFulfilled, onRejected }
}

// Axios 인스턴스 생성 팩토리 함수
export const createAxiosInstance = (config: ApiClientConfig): AxiosInstance => {
    const instance = axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout || 10000,
        headers: {
            'Content-Type': 'application/json',
            ...config.headers,
        },
    })

    // Request Interceptor 적용
    const requestInterceptor = createRequestInterceptor()
    instance.interceptors.request.use(
        requestInterceptor.onFulfilled,
        requestInterceptor.onRejected
    )

    // Response Interceptor 적용
    const responseInterceptor = createResponseInterceptor(instance)
    instance.interceptors.response.use(
        responseInterceptor.onFulfilled,
        responseInterceptor.onRejected
    )

    return instance
}

// Axios 인스턴스 생성 팩토리 함수
export const createRefreshInstance = (
    config: ApiClientConfig
): AxiosInstance => {
    const instance = axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout || 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return instance
}

// 환경 변수 헬퍼
export const getEnvVar = (key: string, defaultValue?: string): string => {
    const env = process.env as Record<string, string | undefined>
    const value = env[key]
    if (!value && !defaultValue) {
        throw new Error(`Environment variable ${key} is not defined`)
    }
    return value || defaultValue || ''
}
