import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useMainScreen } from './useMainScreen'
import { useConsumeOutLinkMain } from '@/src/hooks/router/useConsumeOutLinkMain'
import { PrimaryButton } from '@/src/components/button/PrimaryButton'

export default function MainScreen() {
    useConsumeOutLinkMain()
    const { handlers } = useMainScreen()

    return (
        <View className="flex-1 items-center justify-center bg-white p-6">
            <Text className="mb-8 text-gray-900 font24b">메인 화면</Text>


            <PrimaryButton
                label="샘플 화면으로 이동"
                onPress={handlers.handleNavigateToSample}
            />
        </View>
    )
}
