import { useFonts } from 'expo-font'

/**
 * Pretendard 폰트 로딩 Hook
 *
 * 폰트 파일이 assets/fonts/ 디렉토리에 있어야 합니다.
 * 폰트 파일이 없으면 시스템 폰트를 사용합니다.
 */
export function useFont() {
    // 폰트 파일이 없으면 빌드 에러가 발생할 수 있으므로
    // 폰트 파일을 먼저 추가해야 합니다.
    //
    // 필요한 폰트 파일:
    // - assets/fonts/Pretendard-Regular.ttf
    // - assets/fonts/Pretendard-Medium.ttf
    // - assets/fonts/Pretendard-SemiBold.ttf
    // - assets/fonts/Pretendard-Bold.ttf

    try {
        const [fontsLoaded, fontError] = useFonts({
            'Pretendard-Regular': require('../../../assets/fonts/Pretendard-Regular.ttf'),
            'Pretendard-Medium': require('../../../assets/fonts/Pretendard-Medium.ttf'),
            'Pretendard-SemiBold': require('../../../assets/fonts/Pretendard-SemiBold.ttf'),
            'Pretendard-Bold': require('../../../assets/fonts/Pretendard-Bold.ttf'),
        })

        return { fontsLoaded, fontError }
    } catch (error) {
        // 폰트 파일이 없으면 시스템 폰트 사용
        console.warn(
            'Pretendard 폰트를 로드할 수 없습니다. 시스템 폰트를 사용합니다.',
            error
        )
        return { fontsLoaded: true, fontError: null }
    }
}
