/**
 * 문자열 유틸리티 함수들
 */

/**
 * 긴 주소나 TXID를 앞뒤만 표시하고 중간은 ...으로 줄임
 * @param address 원본 주소/문자열
 * @param startLength 앞에서 표시할 문자 수 (기본값: 6)
 * @param endLength 뒤에서 표시할 문자 수 (기본값: 7)
 * @returns 줄여진 문자열 (예: "0x287c6...b3fc363")
 */
export function truncateAddress(
    address: string,
    startLength: number = 6,
    endLength: number = 7
): string {
    if (!address) {
        return '-'
    }

    // 문자열이 startLength + endLength보다 짧으면 그대로 반환
    if (address.length <= startLength + endLength) {
        return address
    }

    const start = address.slice(0, startLength)
    const end = address.slice(-endLength)

    return `${start}...${end}`
}

export function truncateTxId(
    txId: string,
    startLength: number = 7,
    endLength: number = 7
): string {
    if (!txId) {
        return '-'
    }

    // 문자열이 startLength + endLength보다 짧으면 그대로 반환
    if (txId.length <= startLength + endLength) {
        return txId
    }

    const start = txId.slice(0, startLength)
    const end = txId.slice(-endLength)

    return `${start}...${end}`
}

/**
 * ISO 8601 형식의 날짜/시간 문자열을 KST(한국 표준시)로 변환하여 "YYYY.MM.DD HH:mm:ss" 형식으로 반환
 * @param dateString ISO 8601 형식의 날짜 문자열 (예: "2025-12-08T05:00:39.378704886")
 * @returns 포맷된 날짜 문자열 (예: "2025.12.08 14:00:39") - KST 기준
 */
export function formatDateTime(dateString: string): string {
    if (!dateString) {
        return '-'
    }

    try {
        const date = new Date(dateString)

        // 유효하지 않은 날짜인 경우
        if (isNaN(date.getTime())) {
            return '-'
        }

        // UTC 시간에 9시간(KST 오프셋)을 더하여 KST로 변환
        const kstOffset = 9 * 60 * 60 * 1000 // 9시간을 밀리초로 변환
        const kstDate = new Date(date.getTime() + kstOffset)

        // UTC 기준으로 년월일시분초 추출 (KST로 변환된 값)
        const year = kstDate.getUTCFullYear()
        const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0')
        const day = String(kstDate.getUTCDate()).padStart(2, '0')
        const hours = String(kstDate.getUTCHours()).padStart(2, '0')
        const minutes = String(kstDate.getUTCMinutes()).padStart(2, '0')
        const seconds = String(kstDate.getUTCSeconds()).padStart(2, '0')

        return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`
    } catch (error) {
        return '-'
    }
}

export function formatTimeAgo(date: Date | string): string {
    if (!date) {
        return '-'
    }
    const now = new Date()
    const target = new Date(date)

    const diff = (now.getTime() - target.getTime()) / 1000 // seconds

    const minutes = diff / 60
    const hours = minutes / 60
    const days = hours / 24
    const months = days / 30
    const years = days / 365

    if (diff < 60) return '방금 전'
    if (minutes < 60) return `${Math.floor(minutes)}분 전`
    if (hours < 24) return `${Math.floor(hours)}시간 전`
    if (days < 30) return `${Math.floor(days)}일 전`
    if (months < 12) return `${Math.floor(months)}개월 전`
    return `${Math.floor(years)}년 전`
}

export const formatNumber = (num: number | string) => {
    const str = String(num)
    const parts = str.split('.')
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart
}

/**
 * 은행 계좌번호 마스킹
 * @param account 계좌번호 (예: "110456789012")
 * @returns 마스킹된 계좌번호 (예: "110-456-******")
 */
export function maskBankAccount(account: string): string {
    if (!account || account === '-') return '-'
    // 숫자만 추출
    const digits = account.replace(/[^0-9]/g, '')
    if (digits.length < 6) return account
    // 110-456-****** 포맷
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-******`
}

export const maskName = (name: string) => {
    if (!name || name.length === 0) return name
    if (name.length === 1) return name
    if (name.length === 2) return `${name[0]}*`

    const firstChar = name[0]
    const lastChar = name[name.length - 1]
    const middleStars = '*'.repeat(name.length - 2)

    return `${firstChar}${middleStars}${lastChar}`
}
