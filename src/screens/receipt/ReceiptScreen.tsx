import Router from '@/src/navigation/Router'
import { Button, Text, View } from 'react-native'

export default function ReceiptScreen() {
    const goBack = () => {
        console.log('뒤로가기')

        Router.pop()
    }

    const goMain = () => {
        console.log('에인화면 가기')

        Router.moveToMain()
    }

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>🟢 영수증 화면</Text>

            <View style={{ padding: 20 }}>
                <Button title="뒤로가기" onPress={goBack} />
            </View>
        </View>
    )
}
