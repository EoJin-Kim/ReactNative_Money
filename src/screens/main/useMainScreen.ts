import { useCallback } from 'react'
import Router from '@/src/navigation/Router'
import { MENU } from '@/src/navigation/NavigationTypes'

/**
 * MainScreen 커스텀 훅
 * 메인 화면의 비즈니스 로직을 관리합니다.
 */
export function useMainScreen() {
    const handleNavigateToSample = useCallback(() => {
        Router.moveToMenu(MENU.SAMPLE.INDEX)
    }, [])

    return {
        handlers: {
            handleNavigateToSample,
        },
    }
}
