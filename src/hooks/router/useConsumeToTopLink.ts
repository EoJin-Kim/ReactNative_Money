// useConsumeOutLink.ts

import { DeepLinkManager } from '@/src/deeplink/DeepLinkManger'
import OutLinker from '@/src/deeplink/OutLinker'
import { useCallback } from 'react'

/**
 * 외부에서 감지된 OutLink를 소비(consume)하는 훅
 * - OutLinker.current가 있으면 메뉴 리스트를 추출하고
 * - DeepLinkManager로 이동 실행
 * - 처리 후 OutLinker 초기화
 */
export function useConsumeToTopOutLink() {
    const consumeToTopOutLink = useCallback(() => {
        console.log('🔗 useConsumeOutLink: toTop 딥링크 처리 시작')

        const link = OutLinker.current
        if (!link) {
            console.log('⚠️ OutLinker.current 없음, 처리 중단')
            return
        }

        const menus = link.getMenu()
        if (menus.length > 0) {
            console.log(`uri open hook consumeOutLink count: ${menus.length}`)
            DeepLinkManager.getInstance().setDeepLink(menus)
            DeepLinkManager.getInstance().moveDeepLink()
        }

        OutLinker.removeCurrentLink()
        console.log('✅ OutLinker 초기화 완료')
    }, [])

    return { consumeToTopOutLink }
}
