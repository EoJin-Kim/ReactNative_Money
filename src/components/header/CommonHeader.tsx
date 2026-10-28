import React from 'react'
import { View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { Image as ExpoImage } from 'expo-image'
import Router from '@/src/navigation/Router'

interface CommonHeaderProps {
    title: string
    onBackPress?: () => void
    leftIcon?: string
    rightIcon?: string | React.ReactNode
    onRightIconPress?: () => void
}

// 이미지 경로 매핑 객체
const imageMap: Record<string, ImageSourcePropType> = {
    arrow_back: require('@/src/assets/images/arrow_back.png'),
    icon_close: require('@/src/assets/images/icon_close.png'),
    download: require('@/src/assets/images/download.png'),
    history_filter: require('@/src/assets/images/history_filter.png'),
    content_copy: require('@/src/assets/images/content_copy.png'),
}

/**
 * 공통 헤더 컴포넌트 (2뎁스 이상 화면용)
 * 디자인 시스템 적용: font{크기}{스타일}, 컬러 토큰
 */
export const CommonHeader: React.FC<CommonHeaderProps> = ({
    title,
    onBackPress,
    leftIcon,
    rightIcon,
    onRightIconPress,
}) => {
    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress()
        } else {
            Router.pop()
        }
    }

    const leftIconSource = leftIcon ? imageMap[leftIcon] : null

    return (
        <View className="relative h-14 flex-row items-center bg-white px-5">
            {/* 왼쪽 아이콘/버튼 */}
            <View className="h-6 w-6">
                {leftIconSource ? (
                    <TouchableOpacity
                        onPress={handleBackPress}
                        activeOpacity={0.7}
                        className="h-6 w-6 items-center justify-center"
                    >
                        <ExpoImage
                            source={leftIconSource}
                            style={{ width: 24, height: 24 }}
                            contentFit="contain"
                            transition={0}
                        />
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* 제목 - 항상 중앙에 배치 */}
            <View className="absolute left-0 right-0 items-center justify-center">
                <Text className="text-black font16sb">{title}</Text>
            </View>

            {/* 오른쪽 아이콘/버튼 */}
            <View className="ml-auto h-6 w-6 items-center justify-center">
                {typeof rightIcon === 'string' ? (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        activeOpacity={0.7}
                        className="h-6 w-6 items-center justify-center"
                    >
                        <ExpoImage
                            source={
                                imageMap[rightIcon] ||
                                require('@/src/assets/images/icon_close.png')
                            }
                            style={{ width: 24, height: 24 }}
                            contentFit="contain"
                            transition={0}
                        />
                    </TouchableOpacity>
                ) : (
                    rightIcon
                )}
            </View>
        </View>
    )
}
