import { ExpoConfig, ConfigContext } from 'expo/config'

const IS_DEV = process.env.APP_VARIANT === 'development'
const ANDROID_VERSION_CODE = parseInt(
    process.env.ANDROID_VERSION_CODE || '1',
    10
)

console.log('IS_DEV', IS_DEV)

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        // 필요하면 owner 도 추가 가능
        // owner: 'your-owner',
        name: IS_DEV ? '[Dev] template' : 'template',
        slug: 'pocbank',
        scheme: 'template',
        version: '1.0.0',
        orientation: 'portrait',
        userInterfaceStyle: 'light',
        icon: './assets/icon.png',
        newArchEnabled: true,
        backgroundColor: '#ffffff',
        ios: {
            backgroundColor: '#ffffff',
            supportsTablet: false,
            splash: {
                image: './assets/splash-icon.png',
                resizeMode: 'cover',
                backgroundColor: '#222222',
                enableFullScreen: true,
            },
            bundleIdentifier: 'com.busan.dongbaek.i',
            infoPlist: {
                ITSAppUsesNonExemptEncryption: false,
                NSAppTransportSecurity: {
                    NSAllowsArbitraryLoads: true,
                    NSAllowsLocalNetworking: true,
                },
            },
        },
        android: {
            package: 'com.busan.dongbaek.a',
            versionCode: ANDROID_VERSION_CODE,
            userInterfaceStyle: 'light',
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            edgeToEdgeEnabled: true,
            predictiveBackGestureEnabled: false,
        },
        web: {
            favicon: './assets/favicon.png',
            bundler: 'metro',
        },
        plugins: [
            ...(IS_DEV ? ['expo-dev-client'] : []),
            [
                'expo-build-properties',
                {
                    ios: {
                        deploymentTarget: '15.5',
                    },
                    android: {
                        enableProguardInReleaseBuilds: true,
                        enableShrinkResourcesInReleaseBuilds: true,
                    },
                },
            ],
            'expo-font',
            'expo-secure-store',
            'expo-system-ui',
            [
                'expo-camera',
                {
                    cameraPermission:
                        'QR 코드 스캔을 위해 카메라 접근 권한이 필요합니다.',
                },
            ],
            [
                'expo-image-picker',
                {
                    photosPermission:
                        'QR 코드 이미지 선택을 위해 사진 접근 권한이 필요합니다.',
                    cameraPermission:
                        '프로필 사진 촬영을 위해 카메라 접근 권한이 필요합니다.',
                },
            ],
        ],
        extra: {
            eas: {
                projectId: 'fae986e4-91b9-4338-a0bb-a85f2da247e3',
            },
        },
    }
}
