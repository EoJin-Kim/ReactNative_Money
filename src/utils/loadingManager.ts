/**
 * 전역 로딩 상태 관리자
 * Axios interceptor에서 Provider 외부에서도 로딩 상태를 제어할 수 있도록 함
 */

type LoadingCallback = (loading: boolean) => void

let setLoadingCallback: LoadingCallback | null = null
let requestCount = 0
let isPullToRefreshing = false // 풀투리프레시 중인지 여부

export const loadingManager = {
    /**
     * 로딩 콜백 등록 (LoadingProvider에서 호출)
     */
    register(callback: LoadingCallback) {
        setLoadingCallback = callback
    },

    /**
     * 로딩 콜백 해제
     */
    unregister() {
        setLoadingCallback = null
        requestCount = 0
        isPullToRefreshing = false
    },

    /**
     * 풀투리프레시 시작
     */
    startPullToRefresh() {
        isPullToRefreshing = true
        this.clearAll()
    },

    /**
     * 풀투리프레시 종료
     */
    endPullToRefresh() {
        isPullToRefreshing = false
    },

    /**
     * 요청 시작 시 호출
     */
    startLoading() {
        // 풀투리프레시 중일 때는 로딩을 시작하지 않음
        if (isPullToRefreshing) {
            return
        }
        requestCount += 1
        if (requestCount === 1 && setLoadingCallback) {
            setLoadingCallback(true)
        }
    },

    /**
     * 요청 종료 시 호출
     */
    endLoading() {
        // 풀투리프레시 중일 때는 로딩을 종료하지 않음 (이미 시작하지 않았으므로)
        if (isPullToRefreshing) {
            return
        }
        requestCount = Math.max(0, requestCount - 1)
        if (requestCount === 0 && setLoadingCallback) {
            setLoadingCallback(false)
        }
    },

    /**
     * 현재 진행 중인 요청 수
     */
    getRequestCount() {
        return requestCount
    },

    /**
     * 모든 로딩 상태를 안전하게 초기화
     * 에러 발생 시 모든 진행 중인 로딩을 강제로 해제할 때 사용
     * Race condition을 방지하기 위해 requestCount를 직접 0으로 설정
     */
    clearAll() {
        requestCount = 0
        if (setLoadingCallback) {
            setLoadingCallback(false)
        }
    },
}
