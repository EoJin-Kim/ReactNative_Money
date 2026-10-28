import { useCallback } from 'react'
import { Share } from 'react-native'
import { useToast } from '@/src/providers/ToastProvider'
import useLog from '@/src/hooks/util/useLog'

/**

 *
 * // 사용
 * await share('공유할 문자열')
 * ```
 */
export function useShare() {
    const { showToast } = useToast()
    const log = useLog('useShare')

    const share = useCallback(
        async (message: string) => {
            if (!message || message.trim() === '') {
                showToast('공유할 내용이 없습니다')
                return
            }

            try {
                const shareOptions: { message: string; title?: string } = {
                    message,
                }

                const result = await Share.share(shareOptions)

                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // 특정 앱을 통해 공유된 경우
                        if (log) {
                            log.i('공유 완료:', result.activityType)
                        }
                    } else {
                        // 공유 완료
                        if (log) {
                            log.i('공유 완료')
                        }
                    }

                    showToast('공유에 성공했습니다')
                } else if (result.action === Share.dismissedAction) {
                    // 공유 취소
                    if (log) {
                        log.i('공유 취소됨')
                    }
                }
            } catch (error) {
                console.error('공유 실패:', error)
                if (log) {
                    log.e('공유 실패:', error)
                }
                showToast('공유에 실패했습니다')
            }
        },
        [showToast, log]
    )

    return share
}

export default useShare
