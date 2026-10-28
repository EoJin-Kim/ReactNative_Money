import { useEffect, useState, useRef, useCallback } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { ScreenResultProp } from '@/src/navigation/NavigationTypes'

import { MENU } from '@/src/navigation/NavigationTypes'
import { useGlobalStore } from '@/src/store/useGlobalStore'
import { useQueryClient } from '@tanstack/react-query'
import { useRouteResult } from '@/src/hooks/router/useRouteResult'
import Router from '@/src/navigation/Router'

export const IntroStep = {
    Init: 'init',
    JailBreak: 'jailBreak',
    NetworkMonitoring: 'networkMonitoring',
    Emergency: 'emergency',
    Update: 'update',
    IntroPopup: 'introPopup',
    RefreshToken: 'refreshToken',
    Login: 'login',
    SimplePasswordRegister: 'simplePasswordRegister',
    InitData: 'initData',
    Main: 'main',
} as const

type IntroStepType = (typeof IntroStep)[keyof typeof IntroStep]

const initialQueue: IntroStepType[] = [
    IntroStep.Init,
    IntroStep.JailBreak,
    // IntroStep.NetworkMonitoring,
    // IntroStep.IntroPopup, // 👈 팝업 스텝 추가
    // IntroStep.RefreshToken,
    // IntroStep.Login, // <- 로그인 테스트 필요할 경우 주석 해제 ->
    // IntroStep.SimplePasswordRegister,
    IntroStep.Main,
]

export function useIntroStepsQueue() {
    const [currentStep, setCurrentStep] = useState<IntroStepType | null>(null)
    const [isIntroPopupVisible, setIntroPopupVisible] = useState(false)

    // ✅ Promise의 resolve를 나중에 호출하기 위해 Ref로 보관
    const popupResolveRef = useRef<(() => void) | null>(null)
    const queueRef = useRef([...initialQueue])
    const route = useRoute()
    // const refreshTokenMutation = useRefreshToken()
    const globalStore = useGlobalStore()
    let accessToken = ''
    let refreshToken = ''

    const runQueue = async () => {
        if (queueRef.current.length === 0) {
            console.log('✅ 모든 인트로 단계 완료')
            return
        }

        const step = queueRef.current.shift()!
        setCurrentStep(step)
        console.log(`▶️ Processing: ${step}`)
        await handleStep(step)
    }

    useEffect(() => {
        runQueue()
    }, [])

    useRouteResult((result) => {
        switch (result.screenType) {
            case MENU.INTRO.LOGIN: {
                const res = result.data as {
                    isSuccess: boolean
                    accessToken: string
                    refreshToken: string
                }
                if (res.isSuccess) {
                    accessToken = res.accessToken
                    refreshToken = res.refreshToken

                    // 추후 간편비밀번호 등록 화면 추가되면 필수제거!!!!!!!!!!!!!!!!!!!!
                    // 토큰들은 간편비밀번호 등록화면이 완료가 되면 등록처리가 필요하기때문!!
                    globalStore.setAuthToken(accessToken)
                    globalStore.setRefreshToken(refreshToken)

                    runQueue()
                }
                break
            }
            case MENU.PASSWORD.REGISTER: {
                const res = result.data as {
                    isSuccess: boolean
                }
                console.log('🔄 간편비밀번호 등록 성공')

                if (res.isSuccess) {
                    runQueue()
                }
            }
            default:
                break
        }
    })

    /** 사용자가 팝업을 닫을 때 호출할 함수 */
    const handleIntroPopupConfirm = () => {
        setIntroPopupVisible(false)
        popupResolveRef.current?.() // 👉 기다리던 Promise를 resolve시킴
    }

    async function handleStep(step: IntroStepType) {
        switch (step) {
            case IntroStep.Init:
                checkInit()
                break
            case IntroStep.JailBreak:
                await checkJailBreak()
                break
            case IntroStep.NetworkMonitoring:
                checkNetwork()
                break
            case IntroStep.IntroPopup:
                await checkIntroPopup()
                break
            case IntroStep.RefreshToken:
                await checkRefreshToken()
                break
            case IntroStep.Login:
                await checkLogin()
                break
            case IntroStep.SimplePasswordRegister:
                await checkSimplePasswordRegister()
                break
        }
    }

    function checkInit() {
        console.log('🔒 Init 검사 중...')
        console.log('🔒 Init 검사 완료')
        runQueue()
    }

    async function checkJailBreak() {
        console.log('🔒 JailBreak 검사 중...')
        await new Promise((res) => setTimeout(res, 500))
        runQueue()
    }

    function checkNetwork() {
        console.log('🌐 Network 검사 중...')
        runQueue()
    }

    async function checkIntroPopup() {
        console.log('📢 IntroPopup 표시!')

        await new Promise((res) => setTimeout(res, 500))

        setIntroPopupVisible(true)

        // Promise를 반환하고, 유저가 확인 버튼 누르면 resolve
        return new Promise<void>((resolve) => {
            popupResolveRef.current = resolve
        })
    }

    const isPossibleLogginAsync = async () => {
        // 로그인 시 추가 체크사항 필요할 경우 여기 추가
        return (await useGlobalStore.getState().getAuthToken()).trim() === ''
    }

    async function checkRefreshToken() {
        const isPossibleLoggin = await isPossibleLogginAsync()

        if (!isPossibleLoggin) {
            console.log('🔒 RefreshToken 검사 중...')
            try {
                // const response = await refreshTokenMutation.mutateAsync({
                //     refreshToken: await useGlobalStore
                //         .getState()
                //         .getRefreshToken(),
                // })
                // useGlobalStore.getState().setAuthToken(response.accessToken)
                // useGlobalStore.getState().setRefreshToken(response.refreshToken)
            } catch (error) {
                console.error('🔒 RefreshToken 검사 실패', error)
                useGlobalStore.getState().clear() // 저장되어 있던 토큰 초기화
            }
        }

        runQueue()
    }

    const checkLogin = async () => {
        console.log('🔑 로그인 상태 확인 중...')

        const isPossibleLoggin = await isPossibleLogginAsync()

        console.log('isPossibleLoggin: ', isPossibleLoggin)
        if (isPossibleLoggin) {
            console.log('✅ 로그인 필요')
            await globalStore.setSimplePassword('')
            Router.moveToMenu(MENU.INTRO.LOGIN)
        } else {
            runQueue()
        }
    }

    async function checkSimplePasswordRegister() {
        console.log('🔑 간편비밀번호 등록 상태 확인 중...')
        const simplePassword = await useGlobalStore
            .getState()
            .getSimplePassword()
        if (simplePassword.trim() === '') {
            Router.moveToMenu(MENU.PASSWORD.REGISTER, {
                accessToken: accessToken,
                refreshToken: refreshToken,
            })
        } else {
            runQueue()
        }
    }

    return {
        currentStep,
        isIntroPopupVisible,
        handleIntroPopupConfirm, // 👈 UI에서 버튼 클릭 시 호출
    }
}
