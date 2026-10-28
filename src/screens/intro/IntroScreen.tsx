import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { IntroStep, useIntroStepsQueue } from './useIntroScreen'
import Router from '@/src/navigation/Router'
import { Image as ExpoImage } from 'expo-image'

export default function IntroScreen() {
    const { currentStep } = useIntroStepsQueue()

    useEffect(() => {
        if (currentStep === IntroStep.Main) {
            console.log('🚀 Main 단계 감지 → 화면 이동')
            Router.moveToMain()
        }
    }, [currentStep])

    return (
        <View className="flex-1 items-center justify-center">
            <View className="mb-[60px]">
                {/* <ExpoImage
                    source={require('../../../assets/images/splash-bnk-pp.png')}
                    style={{ width: 237, height: 129 }}
                    contentFit="contain"
                /> */}
                <Text className="mb-8 text-center text-gray-600 font14m">
                    Intro
                </Text>
            </View>
        </View>
    )
}
