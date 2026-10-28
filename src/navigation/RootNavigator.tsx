import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList, MENU } from './NavigationTypes'
import IntroScreen from '@/src/screens/intro/IntroScreen'
import MainScreen from '@/src/screens/main/MainScreen'
import { SampleScreen } from '../screens/sample/SampleScreen'
import NoticeScreen from '../screens/notice/NoticeScreen'
import ReceiptScreen from '../screens/receipt/ReceiptScreen'

const Stack = createStackNavigator<RootStackParamList>()

export function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                headerShown: false,
                gestureEnabled: false,
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}
            initialRouteName={MENU.INTRO.INDEX}
        >
            <Stack.Screen name={MENU.INTRO.INDEX} component={IntroScreen} />
            <Stack.Screen name={MENU.MAIN.INDEX} component={MainScreen} />
            <Stack.Screen name={MENU.NOTICE.INDEX} component={NoticeScreen} />
            <Stack.Screen name={MENU.RECEIPT.INDEX} component={ReceiptScreen} />
            <Stack.Screen name={MENU.SAMPLE.INDEX} component={SampleScreen} />
        </Stack.Navigator>
    )
}
