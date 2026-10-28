
import { useRestartToIntro } from '@/src/hooks/util/useRestartToIntro'
import { Alert, Button, ScrollView, Text, View } from 'react-native'
import { AuthType } from '@/src/utils/auth/CheckList'
import Router from '@/src/navigation/Router'
import { MENU } from '@/src/navigation/NavigationTypes'
import useLog from '@/src/hooks/util/useLog'
import Log from '@/src/utils/Logger'
import { useToast } from '@/src/providers/ToastProvider'
import { useOpenUriLink } from '@/src/hooks/router/useOpenUriLink'
import { useAuthCheck } from '@/src/hooks/auth/useAuthCheck'
import { useCreateDialog } from '@/src/hooks/dialog/useCreateDialog'
import { useRouteResult } from '@/src/hooks/router/useRouteResult'
import { useLoading } from '@/src/providers/LoadingProvider'
import { useGetSample, usePostSample } from '@/src/hooks/api/useSampleApi'
import { CommonHeader } from '@/src/components/header/CommonHeader'

export function SampleScreen() {
    const log = useLog('SampleScreen')
    const { openUriLink } = useOpenUriLink()
    const { authCheck } = useAuthCheck()

    const { showAlertDialog, showConfirmTitleDialog } = useCreateDialog()
    const showToastContext = useToast()
    const { setLoading } = useLoading()
    const sampleGetQuery = useGetSample()
    const samplePostQuery = usePostSample()

    useRouteResult((result) => {
        switch (result.screenType) {
            // case MENU.WALLET.INDEX: {
            //     // ✅ 콜론(:) 사용
            //     const res = result.data as WalletMainArg
            //     console.log('💬 받은 결과:', res)
            //     Alert.alert(res.id)
            //     break // ✅ switch 문에서는 break 필수
            // }


            // 필요 시 다른 화면 케이스 추가
            default:
                console.log('💬 처리되지 않은 screenType:', result.screenType)
                break
        }
    })

    const walletArg = {
        id: 'pci',
    }

    const authCheckKyc = () => {
        // 케이스 1: useLog 훅 사용 (className만 자동 포함)
        log.d('인증 체크 시작')
        authCheck(AuthType.KYC_AUTH, () => {
            log.i('인증 체크 성공')
        })
    }

    const showAlert = () => {
        // 케이스 1: useLog 훅 사용
        log.d('Alert 다이얼로그 표시')
        showAlertDialog('alert 테스트')
    }

    const showConfirmTitle = () => {
        log.d('Confirm 다이얼로그 표시')
        showConfirmTitleDialog('confirm title', 'confirm 테스트')
    }

    const showToast = () => {
        showToastContext.showToast('토스트 메시지')
    }

    const showLoading = () => {
        // Note: 로딩은 Axios interceptor에서 자동으로 관리됨
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
        log.d('로딩 테스트 - API 호출 시 자동 표시')
    }

    // 케이스 2: Log 직접 사용 (다른 함수에서)
    const getApiRequest = () => {
        sampleGetQuery.refetch()
    }
    const postApiRequest = () => {
        samplePostQuery.mutate({
            email: 'test@test.com',
            password: 'test',
        })
    }


    return (
        <View>
            <CommonHeader title="Sample" leftIcon="arrow_back" />
            <ScrollView>
                <Text style={{ color: 'black', fontSize: 24 }}>Sample</Text>

                <View style={{ padding: 20 }}>
                    <Button
                        title="딥링크 공지"
                        onPress={async () =>
                            openUriLink('template://deeplink/notice')
                        }
                    />
                </View>

                <View style={{ padding: 20 }}>
                    <Button
                        title="딥링크 영수증"
                        onPress={async () =>
                            openUriLink('template://deeplink/receipt')
                        }
                    />
                </View>

                <View style={{ padding: 20 }}>
                    <Button title="인증 체크" onPress={() => authCheckKyc()} />
                </View>
                <View style={{ padding: 20 }}>
                    <Button title="Alert" onPress={() => showAlert()} />
                </View>
                <View style={{ padding: 20 }}>
                    <Button
                        title="ConfirmTitle"
                        onPress={() => showConfirmTitle()}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Button title="로딩" onPress={() => showLoading()} />
                </View>
                <View style={{ padding: 20 }}>
                    <Button title="Toast" onPress={() => showToast()} />
                </View>

                <View style={{ padding: 20 }}>
                    <Button
                        title="케이스 1: useLog 훅 사용"
                        onPress={() => {
                            // 케이스 1: useLog 훅 사용 (className만 자동 포함)
                            // 출력: [SampleScreen] 디버그 로그 예시
                            log.d('디버그 로그 예시')
                            log.i('정보 로그 예시')
                            log.w('경고 로그 예시')
                            log.e('에러 로그 예시')
                            log.l('일반 로그 예시')
                        }}
                    />
                </View>


                <View style={{ padding: 20 }}>
                    <Button
                        title="get api 요청"
                        onPress={getApiRequest}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Button
                        title="post api 요청"
                        onPress={postApiRequest}
                    />
                </View>
            </ScrollView>
        </View>

    )
}
