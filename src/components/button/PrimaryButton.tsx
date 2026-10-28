import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface PrimaryButtonProps {
    label: string
    onPress: () => void
    disabled?: boolean
    fullWidth?: boolean
}

/**
 * 주요 버튼 컴포넌트
 * 디자인 시스템 적용: font{크기}{스타일}, 컬러 토큰
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    label,
    onPress,
    disabled = false,
    fullWidth = true,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            className={`h-14 items-center justify-center gap-[10px] rounded-[5px] bg-primary ${fullWidth ? 'w-full' : ''}`}
            style={{
                opacity: disabled ? 0.5 : 1,
            }}
        >
            <Text className="text-white font16sb">{label}</Text>
        </TouchableOpacity>
    )
}
