/**
 * 로그 유틸리티
 * Log.d, Log.i, Log.w, Log.e 등의 메서드를 제공합니다.
 */

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug'

export interface LogContext {
    className?: string
    functionName?: string
}

/**
 * 로그 포맷팅 함수
 */
function formatLog(
    level: LogLevel,
    message: string,
    context?: LogContext,
    ...args: any[]
): string {
    let location = ''

    // 컨텍스트로 전달된 클래스명/함수명 사용
    if (context?.className && context?.functionName) {
        location = `${context.className}.${context.functionName}`
    } else if (context?.className) {
        location = context.className
    } else if (context?.functionName) {
        location = context.functionName
    }

    const prefix = location ? `[${location}]` : ''

    return prefix ? `${prefix} ${message}` : message
}

/**
 * 로거 객체
 */
export const Log = {
    /**
     * 일반 로그
     */
    l(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('log', message, context, ...args)
        console.log(formatted, ...args)
    },

    /**
     * 정보 로그
     */
    i(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('info', message, context, ...args)
        console.info(formatted, ...args)
    },

    /**
     * 경고 로그
     */
    w(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('warn', message, context, ...args)
        console.warn(formatted, ...args)
    },

    /**
     * 에러 로그
     */
    e(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('error', message, context, ...args)
        console.error(formatted, ...args)
    },

    /**
     * 디버그 로그
     */
    d(message: string, context?: LogContext, ...args: any[]): void {
        const formatted = formatLog('debug', message, context, ...args)
        console.log(formatted, ...args)
    },
}

export default Log
