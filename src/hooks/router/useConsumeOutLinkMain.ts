import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { useConsumeToTopOutLink } from './useConsumeToTopLink'
import { DeepLinkManager } from '@/src/deeplink/DeepLinkManger'
import OutLinker from '@/src/deeplink/OutLinker'
import { MainOutLink } from '@/src/deeplink/outlink/MainOutLink'
import { LinkType } from '@/src/deeplink/OutLink'

/**
 * 포커스 + AppState(백그라운드 복귀) 기반 딥링크 처리 훅
 * 내부에서 openURL()을 호출한 경우는 AppState 이벤트 무시
 */
export function useConsumeOutLinkMain() {
    const { consumeToTopOutLink } = useConsumeToTopOutLink()

    /** 딥링크 실행 로직 */
    const consumeOutLink = useCallback(() => {
        console.log('🚀 consumeOutLink 실행')

        const link = OutLinker.current
        if (link) {
            if (link instanceof MainOutLink) {
                console.log(`🧭 MainOutLink 타입: ${link.linkType}`)
                const info = link.getParamInfo()
                console.log('Param Info:', info)
                // MainOutLink는 딥링크 큐 초기화
                DeepLinkManager.getInstance().clear()
                OutLinker.removeCurrentLink()
            } else if (link.linkType === LinkType.ToTop) {
                // ToTop 타입은 딥링크 큐 초기화 후 재설정
                DeepLinkManager.getInstance().clear()
                consumeToTopOutLink()
            } else if (link.linkType === LinkType.ToMain) {
                // ToMain 타입은 딥링크 큐를 유지 (이미 useOpenUriLink에서 설정됨)
                console.log('🔗 ToMain 타입: 딥링크 큐 유지')
            }
        }

        OutLinker.removeCurrentLink()
    }, [])

    /** 화면 포커스될 때 실행 */
    useFocusEffect(
        useCallback(() => {
            console.log('🔄 MainScreen 포커스됨 — 딥링크 실행')
            consumeOutLink()

            return () => {
                console.log('🔕 MainScreen 포커스 해제')
            }
        }, [consumeOutLink])
    )
}
