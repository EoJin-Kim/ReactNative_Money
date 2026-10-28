import 'react-native-gesture-handler'
import './global.css'
import { StatusBar } from 'expo-status-bar'
import { composeProviders } from './src/providers/ComposeProviders'
import { QueryProvider } from './src/providers/QueryProvider'
import { LoadingProvider } from './src/providers/LoadingProvider'
import { ToastProvider } from './src/providers/ToastProvider'
import { DeeplinkProvider } from './src/providers/DeeplinkProvider'
import { RootNavigator } from './src/navigation/RootNavigator'
import { DialogProvider } from './src/providers/DialogProvider'
import { useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useFont } from './src/hooks/util/useFont'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BaseScreen } from './src/screens/base/BaseScreen'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './src/navigation/Router'
import { AuthCheckProvider } from './src/providers/AuthCheckProvider'

// 프로바이더 통합 먼저 입력한 프로바이더가 상위로 등록
const AppProviders = composeProviders(
    DeeplinkProvider,
    AuthCheckProvider,
    DialogProvider,
    ToastProvider,
    LoadingProvider,
    QueryProvider
)

export default function App() {
    // Firebase 초기화
    useEffect(() => {
        // initializeFirebase()
    }, [])

    // Pretendard 폰트 로딩
    const { fontsLoaded, fontError } = useFont()

    // 폰트 로딩 중이면 로딩 화면 표시
    if (!fontsLoaded && !fontError) {
        return (
            <SafeAreaProvider>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2196F3" />
                </View>
            </SafeAreaProvider>
        )
    }

    return (
        <AppProviders>
            <SafeAreaProvider>
                <BaseScreen>
                    <NavigationContainer
                        ref={navigationRef}
                        onReady={() => {
                            console.log('📱 Navigation ready')
                            // 네비게이션 준비 완료 확인
                            if (navigationRef.isReady()) {
                                console.log('✅ Navigation ref is ready')
                            }
                        }}
                        onUnhandledAction={(e) => {
                            console.log('⚠️ Unhandled nav action:', e)
                        }}
                    >
                        <RootNavigator />
                    </NavigationContainer>
                </BaseScreen>
            </SafeAreaProvider>
        </AppProviders>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
})
