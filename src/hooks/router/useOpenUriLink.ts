// useSmartLink.ts

import { MENU } from '@/src/navigation/NavigationTypes'
import Router, { navigationRef } from '@/src/navigation/Router'
import * as Linking from 'expo-linking'
import { useCallback } from 'react'
import { useConsumeToTopOutLink } from './useConsumeToTopLink'
import { DeepLinkManager } from '@/src/deeplink/DeepLinkManger'
import { localHost, localScheme } from '@/src/utils/constants'
import OutLinker from '@/src/deeplink/OutLinker'
import { LinkType } from '@/src/deeplink/OutLink'
import useLog from '../util/useLog'
/**
 * 내부/외부 딥링크를 자동으로 구분해 처리하는 커스텀 훅
 * 내부 스킴 (예: myapp://)은 router.push()로,
 * 외부 URL은 Linking.openURL()로 처리
 *
 * "when" 스타일로 조건 분기 처리
 */
export const useOpenUriLink = () => {
    const log = useLog('useOpenUriLink')
    const { consumeToTopOutLink } = useConsumeToTopOutLink()

    const internalScheme: string = localScheme + '://' + localHost

    const deeplinkHandler = ({ url }: { url: string }) => {
        console.log('📡 포어그라운드 내부 딥링크 훅 감지:', url)

        // ✅ 1. 여기서 중앙 관리 (분기 처리)
        const findLink = OutLinker.find(url)

        // 존재하는 딥링크
        if (findLink) {
            console.log('find deeplink', findLink)
            ensureMainScreenAndNavigate()
        } else {
            console.log('적용되있지 않은 딥링크')
        }
    }

    const ensureMainScreenAndNavigate = () => {
        if (!navigationRef.isReady()) return

        if (existMainScreen()) {
            console.log('✅ 메인화면 이미 존재합니다.')

            if (OutLinker.current?.linkType == LinkType.ToMain) {
                // ✅ ToMain 타입일 때도 딥링크 큐를 먼저 설정
                const link = OutLinker.current
                const menus = link.getMenu()
                if (menus.length > 0) {
                    console.log(`🔗 ToMain 딥링크 큐 설정: ${menus.length}개`)
                    DeepLinkManager.getInstance().setDeepLink(menus)
                }

                setTimeout(() => {
                    console.log('moveToMain 전 ------------------------------')
                    Router.moveToMain()
                }, 300) // 0.3초 딜레이 추가
            } else if (OutLinker.current?.linkType == LinkType.ToTop) {
                consumeToTopOutLink()
            }
        } else {
            console.log('🔄 메인화면 없어 아무처리하지않음')
        }
    }

    const existMainScreen = () => {
        if (!navigationRef.isReady()) {
            console.warn('⚠️ navigationRef가 아직 초기화되지 않았습니다.')
            return false
        }
        const state = navigationRef.getState()
        if (!state) {
            console.warn(
                '⚠️ navigationRef.getState()가 반환하는 값이 없습니다.'
            )
            return false
        }
        console.log(
            '🧐 현재 네비게이션 스택 확인:',
            state.routes.map((route) => route.name)
        )
        const findScreenInNavigator = (
            navigatorState: any,
            targetScreen: string
        ): boolean => {
            console.log(
                `   🔍 현재 네비게이터 체크 중: ${navigatorState.routes.map(
                    (r: { name: any }) => r.name
                )}`
            )
            if (
                navigatorState.routes.some(
                    (route: { name: string }) => route.name === targetScreen
                )
            ) {
                console.log(`✅ ${targetScreen} 발견!`)
                return true
            }
            // ✅ 네비게이터 내부에 또 다른 네비게이터가 있는 경우 재귀 탐색
            for (const route of navigatorState.routes) {
                if (
                    route.state &&
                    findScreenInNavigator(route.state, targetScreen)
                ) {
                    return true
                }
            }
            return false
        }
        return findScreenInNavigator(state, MENU.MAIN.INDEX)
    }

    const openUriLink = useCallback(async (url: string) => {
        console.log('📡 오픈 링크:', url)
        if (!url) return

        try {
            if (url.startsWith(internalScheme)) {
                deeplinkHandler({ url: url })
            } else {
                log.d('open external link', url)
                await Linking.openURL(url)
            }
        } catch (err) {
            console.error('❌ useSmartLink error:', err)
        }
    }, [])

    return { openUriLink }
}
