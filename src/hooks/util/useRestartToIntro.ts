// hooks/useRestartToIntro.ts
import { useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainerRef } from '@react-navigation/native'
import Router, { navigationRef } from '@/src/navigation/Router'
import { MENU } from '@/src/navigation/NavigationTypes'

const APP_CLOSE_CHECK_KEY = 'APP_CLOSE_CHECK_KEY'

/**
 * 앱이 완전히 종료되었다가 다시 실행될 때 Intro로 이동시키는 훅
 * (React Navigation 전용)
 */
export const useRestartToIntro = () => {
    const appState = useRef<AppStateStatus>(AppState.currentState)

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            async (nextAppState) => {
                // background → active 전환 감지
                if (
                    appState.current.match(/background|inactive/) &&
                    nextAppState === 'active'
                ) {
                    console.log('📲 앱이 다시 활성화됨. 스토리지 값 확인 중...')

                    try {
                        const storedValue =
                            await AsyncStorage.getItem(APP_CLOSE_CHECK_KEY)
                        console.log(
                            `📦 ${APP_CLOSE_CHECK_KEY} 값:`,
                            storedValue
                        )

                        if (storedValue == 'closed') {
                            console.log(
                                `✅ 앱 종료 값 존재 → 메인화면에서 앱 재시작`
                            )
                            AsyncStorage.setItem(APP_CLOSE_CHECK_KEY, '')
                            Router.restart()
                        }
                    } catch (err) {
                        console.warn('AsyncStorage read error:', err)
                    }
                }

                appState.current = nextAppState
            }
        )

        return () => subscription.remove()
    }, [])
}
