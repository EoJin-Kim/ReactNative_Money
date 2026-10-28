import { createAxiosInstance, createRefreshInstance } from './config'

// BNK POC API Client
const sampleClient = createAxiosInstance({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 60000,
})

// 세션 쿠키 기반 인증을 위한 설정
sampleClient.defaults.withCredentials = false

// Refresh token 호출을 위한 별도의 axios 인스턴스 (interceptor 없음)
const refreshAxiosInstance = createRefreshInstance({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 60000,
})
refreshAxiosInstance.defaults.withCredentials = false

// 개발 환경에서 localhost 사용 (필요시 활성화)
// if (__DEV__) {
//     bnkPocClient.defaults.baseURL = 'http://localhost:8080'
// }

export default sampleClient
export { refreshAxiosInstance }
