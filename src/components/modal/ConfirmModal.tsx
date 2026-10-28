import React from 'react'
import { Modal, Pressable, Text, View } from 'react-native'

export type ConfirmModalProps = {
    visible: boolean
    content?: string
    onConfirm: () => void
    onCancel?: () => void
    onDismiss?: () => void
    confirmText?: string
    cancelText?: string
    className?: string
}

export default function ConfirmModal({
    visible,
    content,
    onConfirm,
    onCancel,
    onDismiss,
    confirmText = '확인',
    cancelText = '취소',
    className = '',
}: ConfirmModalProps) {
    const handleOverlayPress = () => {
        // 오버레이를 탭하면 다이얼로그만 닫고 onConfirm은 실행하지 않음
        onDismiss?.()
    }

    const handlePanelPress = (e: any) => {
        // 패널 내부를 탭했을 때는 이벤트 전파를 막아서 오버레이 핸들러가 실행되지 않도록 함
        e.stopPropagation()
    }

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={() => {}}
        >
            <Pressable
                className={styles.bg}
                onPress={handleOverlayPress}
                accessible={false}
            >
                <Pressable
                    className={`${styles.panel} ${className}`.trim()}
                    onPress={handlePanelPress}
                >
                    <View className={styles.inner}>
                        {content && (
                            <Text className={styles.content}>{content}</Text>
                        )}
                    </View>
                    <View className={styles.buttonContainer}>
                        <Pressable
                            onPress={onCancel}
                            className={styles.cancelButton}
                        >
                            <Text className={styles.cancelButtonText}>
                                {cancelText}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={onConfirm}
                            className={styles.button}
                        >
                            <Text className={styles.buttonText}>
                                {confirmText}
                            </Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

const styles = {
    bg: `flex-1 bg-black/50 justify-center items-center px-12`,
    panel: `w-full max-w-lg bg-white`,
    inner: `py-8 px-5 justify-center items-center`,
    content: `font14r text-black text-center`,
    buttonContainer: `flex-row justify-center items-center`,
    button: `flex-1 h-12 bg-[#161616] justify-center items-center`,
    buttonText: `font16sb text-white`,
    cancelButton: `flex-1 h-12 bg-[#EEEEEE] justify-center items-center`,
    cancelButtonText: `font16sb text-black`,
}
