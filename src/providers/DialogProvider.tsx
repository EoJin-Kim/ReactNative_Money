import React, { createContext, useContext, useState, useEffect } from 'react'
import AlertModal from '../components/modal/AlertModal'
import AlertTitleModal from '../components/modal/AlertTitleModal'
import ConfirmTitleModal from '../components/modal/ConfirmTitleModal'
import ConfirmModal from '../components/modal/ConfirmModal'


type PopupData = {
    type: DialogType
    title?: string
    message?: string
    confirm?: string
    cancel?: string
    onCancel?: () => void
    onConfirm?: () => void
}

export enum DialogType {
    Warning = 'Warning',
    Alert = 'Alert',
    AlertTitle = 'AlertTitle',
    Confirm = 'Confirm',
    ConfirmTitle = 'ConfirmTitle',
}

type DialogContextType = {
    showDialogContext: (data: PopupData) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false)
    const [popupData, setPopupData] = useState<PopupData | null>(null)

    const showPopup = (data: PopupData) => {
        // React의 상태 업데이트 배치 처리를 고려하여 먼저 popupData를 설정한 후
        // 다음 이벤트 루프에서 visible을 true로 설정
        setPopupData(data)
        // 상태 업데이트가 완료된 후 visible을 true로 설정
        setTimeout(() => {
            setVisible(true)
        }, 0)
    }

    const handleConfirm = () => {
        popupData?.onConfirm?.()
        setVisible(false)
    }

    const handleCancel = () => {
        popupData?.onCancel?.()
        setVisible(false)
    }

    const handleDismiss = () => {
        // 오버레이를 탭했을 때는 다이얼로그만 닫고 콜백은 실행하지 않음
        setVisible(false)
    }

    const renderDialog = () => {
        switch (popupData?.type) {
            case DialogType.Alert:
                return (
                    <AlertModal
                        visible={visible}
                        content={popupData?.message}
                        onConfirm={handleConfirm}
                        onDismiss={handleDismiss}
                        confirmText={popupData?.confirm}
                    />
                )
            case DialogType.AlertTitle:
                return (
                    <AlertTitleModal
                        visible={visible}
                        title={popupData?.title}
                        content={popupData?.message}
                        onConfirm={handleConfirm}
                        onDismiss={handleDismiss}
                        confirmText={popupData?.confirm}
                    />
                )
            case DialogType.Confirm:
                return (
                    <ConfirmModal
                        visible={visible}
                        content={popupData?.message}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        onDismiss={handleDismiss}
                        confirmText={popupData?.confirm}
                        cancelText={popupData?.cancel}
                    />
                )
            case DialogType.ConfirmTitle:
                return (
                    <ConfirmTitleModal
                        visible={visible}
                        title={popupData?.title}
                        content={popupData?.message}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        onDismiss={handleDismiss}
                        confirmText={popupData?.confirm}
                        cancelText={popupData?.cancel}
                    />
                )
            default:
                return null // Handle unknown type
        }
    }

    return (
        <DialogContext.Provider value={{ showDialogContext: showPopup }}>
            {children}
            {visible && renderDialog()}
        </DialogContext.Provider>
    )
}

export const useDialogContext = () => {
    const context = useContext(DialogContext)
    if (!context) throw new Error('usePopup must be used within PopupProvider')
    return context
}
