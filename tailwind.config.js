/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            // 컬러 시스템
            colors: {
                // Primary 컬러
                primary: {
                    50: '#E3F2FD',
                    100: '#BBDEFB',
                    200: '#90CAF9',
                    300: '#64B5F6',
                    400: '#42A5F5',
                    500: '#2196F3',
                    600: '#1E88E5',
                    700: '#1976D2',
                    800: '#1565C0',
                    900: '#0D47A1',
                    DEFAULT: '#2196F3',
                    light: '#42A5F5',
                    dark: '#1976D2',
                },
                // Secondary 컬러 (뉴트럴 그레이)
                secondary: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#EEEEEE',
                    300: '#E0E0E0',
                    400: '#BDBDBD',
                    500: '#9E9E9E',
                    600: '#757575',
                    700: '#616161',
                    800: '#424242',
                    900: '#212121',
                    DEFAULT: '#9E9E9E',
                },
                // 시맨틱 컬러
                success: {
                    light: '#4CAF50',
                    dark: '#66BB6A',
                    DEFAULT: '#4CAF50',
                },
                warning: {
                    light: '#FF9800',
                    dark: '#FFB74D',
                    DEFAULT: '#FF9800',
                },
                error: {
                    light: '#F44336',
                    dark: '#EF5350',
                    DEFAULT: '#F44336',
                },
                info: {
                    light: '#2196F3',
                    dark: '#42A5F5',
                    DEFAULT: '#2196F3',
                },
                primary: {
                    light: '#6B4CE6',
                    dark: '#6B4CE6',
                    DEFAULT: '#6B4CE6',
                },
            },
            // 폰트 패밀리
            fontFamily: {
                sans: ['Pretendard', 'system-ui', 'sans-serif'],
                'sans-bold': ['Pretendard-Bold', 'system-ui', 'sans-serif'],
                'sans-medium': ['Pretendard-Medium', 'system-ui', 'sans-serif'],
                'sans-semibold': [
                    'Pretendard-SemiBold',
                    'system-ui',
                    'sans-serif',
                ],
                mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
            },
            // 타이포그래피 스케일
            fontSize: {
                'display-lg': [
                    '57px',
                    { lineHeight: '64px', letterSpacing: '-0.25px' },
                ],
                'display-md': [
                    '45px',
                    { lineHeight: '52px', letterSpacing: '0px' },
                ],
                'display-sm': [
                    '36px',
                    { lineHeight: '44px', letterSpacing: '0px' },
                ],
                'headline-lg': [
                    '32px',
                    {
                        lineHeight: '40px',
                        letterSpacing: '0px',
                        fontWeight: '600',
                    },
                ],
                'headline-md': [
                    '28px',
                    {
                        lineHeight: '36px',
                        letterSpacing: '0px',
                        fontWeight: '600',
                    },
                ],
                'headline-sm': [
                    '24px',
                    {
                        lineHeight: '32px',
                        letterSpacing: '0px',
                        fontWeight: '600',
                    },
                ],
                'title-lg': [
                    '22px',
                    {
                        lineHeight: '28px',
                        letterSpacing: '0px',
                        fontWeight: '600',
                    },
                ],
                'title-md': [
                    '16px',
                    {
                        lineHeight: '24px',
                        letterSpacing: '0.15px',
                        fontWeight: '600',
                    },
                ],
                'title-sm': [
                    '14px',
                    {
                        lineHeight: '20px',
                        letterSpacing: '0.1px',
                        fontWeight: '600',
                    },
                ],
                'body-lg': [
                    '16px',
                    {
                        lineHeight: '24px',
                        letterSpacing: '0.5px',
                        fontWeight: '400',
                    },
                ],
                'body-md': [
                    '14px',
                    {
                        lineHeight: '20px',
                        letterSpacing: '0.25px',
                        fontWeight: '400',
                    },
                ],
                'body-sm': [
                    '12px',
                    {
                        lineHeight: '16px',
                        letterSpacing: '0.4px',
                        fontWeight: '400',
                    },
                ],
                'label-lg': [
                    '14px',
                    {
                        lineHeight: '20px',
                        letterSpacing: '0.1px',
                        fontWeight: '500',
                    },
                ],
                'label-md': [
                    '12px',
                    {
                        lineHeight: '16px',
                        letterSpacing: '0.5px',
                        fontWeight: '500',
                    },
                ],
                'label-sm': [
                    '11px',
                    {
                        lineHeight: '16px',
                        letterSpacing: '0.5px',
                        fontWeight: '500',
                    },
                ],
            },
            // 스페이싱 (4px 베이스 유닛)
            spacing: {
                xs: '4px',
                sm: '8px',
                md: '16px',
                lg: '24px',
                xl: '32px',
                xxl: '40px',
                xxxl: '48px',
            },
            // Border Radius
            borderRadius: {
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                '2xl': '20px',
                '3xl': '24px',
            },
        },
    },
    plugins: [require('./tailwind.plugin.font-styles')],
}
