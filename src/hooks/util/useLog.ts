import { useMemo } from 'react'
import { Log, LogContext } from '@/src/utils/Logger'

/**
 * 클래스명을 받아서 자동으로 로그에 포함시키는 훅
 *
 * @param className 클래스명 또는 컴포넌트명
 * @returns 로그 메서드 객체 (d, i, w, e, l)
 *
 * @example
 * ```tsx
 * const log = useLog('SampleNetworkScreen');
 * log.d('디버그 메시지'); // [SampleNetworkScreen] 디버그 메시지
 * log.i('정보 메시지'); // [SampleNetworkScreen] 정보 메시지
 * ```
 */
export function useLog(className: string) {
    const context: LogContext = useMemo(
        () => ({
            className,
        }),
        [className]
    )

    return useMemo(
        () => ({
            /**
             * 디버그 로그
             */
            d(message: string, ...args: any[]): void {
                Log.d(message, context, ...args)
            },

            /**
             * 정보 로그
             */
            i(message: string, ...args: any[]): void {
                Log.i(message, context, ...args)
            },

            /**
             * 경고 로그
             */
            w(message: string, ...args: any[]): void {
                Log.w(message, context, ...args)
            },

            /**
             * 에러 로그
             */
            e(message: string, ...args: any[]): void {
                Log.e(message, context, ...args)
            },

            /**
             * 일반 로그
             */
            l(message: string, ...args: any[]): void {
                Log.l(message, context, ...args)
            },
        }),
        [context]
    )
}

export default useLog
