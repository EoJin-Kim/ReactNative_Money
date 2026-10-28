import Router, { navigationRef } from '@/src/navigation/Router'
import * as Linking from 'expo-linking'
import { useEffect } from 'react'
import OutLinker from '../deeplink/OutLinker'
import { DeepLinkManager } from '../deeplink/DeepLinkManger'
import { LinkType } from '../deeplink/OutLink'
import { useConsumeToTopOutLink } from '../hooks/router/useConsumeToTopLink'
import { EXCLUDED_SCREENS } from '../navigation/NavigationTypes'

export function DeeplinkProvider({ children }: { children: React.ReactNode }) {
    const navigation = navigationRef // or useNavigationContainerRef()

    const { consumeToTopOutLink } = useConsumeToTopOutLink()

    // 백그라운드 및 앱종료 상태 딥링크 이벤트 수신
    useEffect(() => {
        // ✅백그라운드 상태 감지
        // 포어그라운드 내부 딥링크 탐지는 따로 안함
        // 포어그라운드 딥링크는 useOpenUriLink.ts 에서 따로 처리
        const listener = Linking.addEventListener('url', ({ url }) => {
            console.log('🔥 내부 딥링크 감지됨:', url)
            let findLink = OutLinker.find(url)
            if (findLink) {
                console.log('📲 백그라운드 내부 딥링크 감지:', findLink)

                if (findLink.linkType == LinkType.ToMain) {
                    // ✅ ToMain 타입일 때도 딥링크 큐를 먼저 설정
                    const menus = findLink.getMenu()
                    if (menus.length > 0) {
                        console.log(
                            `🔗 ToMain 딥링크 큐 설정: ${menus.length}개`
                        )
                        DeepLinkManager.getInstance().setDeepLink(menus)
                    }
                    Router.moveToMain()
                } else {
                    // linkType이 toTop 인경우 바로 이동
                    consumeToTopOutLink()
                }
            }
        })

        // 콜드 스타트
        Linking.getInitialURL().then((url) => {
            console.log('📲 콜드 스타트 일반실행 : ', url)
            if (url) {
                let findLink = OutLinker.find(url)
                if (findLink) {
                    console.log('📲 콜드 스타트 딥링크 감지:', findLink)

                    // ✅ 콜드 스타트도 동일하게 처리
                    if (findLink.linkType == LinkType.ToMain) {
                        const menus = findLink.getMenu()
                        if (menus.length > 0) {
                            console.log(
                                `🔗 콜드 스타트 ToMain 딥링크 큐 설정: ${menus.length}개`
                            )
                            DeepLinkManager.getInstance().setDeepLink(menus)
                        }
                        // 콜드 스타트는 앱이 시작되면서 자동으로 메인으로 이동하므로 moveToMain 불필요
                    } else {
                        consumeToTopOutLink()
                    }
                }
            }
        })

        return () => {
            listener.remove()
        }
    }, [])

    // 모든 화면전환 감지
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            if (!navigationRef.current) return // ✅ navigationRef가 없으면 실행 안 함
            const currentRoute = navigationRef.current.getCurrentRoute()
            if (!currentRoute) return
            console.log(`🚀 화면 변경됨: ${currentRoute.name}`)

            deepLinkCheck(currentRoute.name)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    function deepLinkCheck(screenName?: string) {
        if (screenName && EXCLUDED_SCREENS.includes(screenName)) {
            console.log(
                `✅ 현재 화면은 ${screenName} 입니다. 데이터 새로고침 실행!`
            )
        } else {
            setTimeout(() => {
                DeepLinkManager.getInstance().moveDeepLink()
            }, 300)
        }
    }

    return <>{children}</>
}
