import React, { useState, useEffect } from 'react'
import { Image, View } from 'react-native'

interface LoadingDialogProps {}

const LoadingDialog: React.FC<LoadingDialogProps> = () => {
    const [imageIndex, setImageIndex] = useState(0)

    // 여러 개의 로딩 이미지 배열 (로컬 이미지 사용)
    const images = [
        require('@/src/assets/loading/frame_1.png'),
        require('@/src/assets/loading/frame_2.png'),
        require('@/src/assets/loading/frame_3.png'),
        require('@/src/assets/loading/frame_4.png'),
        require('@/src/assets/loading/frame_5.png'),
        require('@/src/assets/loading/frame_6.png'),
        require('@/src/assets/loading/frame_7.png'),
        require('@/src/assets/loading/frame_8.png'),
        require('@/src/assets/loading/frame_9.png'),
        require('@/src/assets/loading/frame_10.png'),
        require('@/src/assets/loading/frame_11.png'),
        require('@/src/assets/loading/frame_12.png'),
        require('@/src/assets/loading/frame_13.png'),
        require('@/src/assets/loading/frame_14.png'),
        require('@/src/assets/loading/frame_15.png'),
        require('@/src/assets/loading/frame_16.png'),
        require('@/src/assets/loading/frame_17.png'),
        require('@/src/assets/loading/frame_18.png'),
        require('@/src/assets/loading/frame_19.png'),
        require('@/src/assets/loading/frame_20.png'),
        require('@/src/assets/loading/frame_21.png'),
        require('@/src/assets/loading/frame_22.png'),
        require('@/src/assets/loading/frame_23.png'),
        require('@/src/assets/loading/frame_24.png'),
        require('@/src/assets/loading/frame_25.png'),
        require('@/src/assets/loading/frame_26.png'),
        require('@/src/assets/loading/frame_27.png'),
        require('@/src/assets/loading/frame_28.png'),
        require('@/src/assets/loading/frame_29.png'),
        require('@/src/assets/loading/frame_30.png'),
    ]

    useEffect(() => {
        // 30fps로 애니메이션 (약 33ms마다 프레임 변경)
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 33)

        return () => clearInterval(interval)
    }, [images.length])

    return (
        <View className="absolute inset-0 z-50 items-center justify-center bg-black/40">
            <Image
                source={images[imageIndex]}
                className="h-32 w-32"
                resizeMode="contain"
            />
        </View>
    )
}

export default LoadingDialog
