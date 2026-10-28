import { DialogType, useDialogContext } from '@/src/providers/DialogProvider'
import { Alert } from 'react-native'

/**
 * ✅ 공통 다이얼로그 훅
 */
export const useCreateDialog = () => {
    const { showDialogContext } = useDialogContext()
    /** ⚠️ 간단 알림 (제목 없음) */
    const showAlertDialog = (
        message: string,
        confirm: string = '확인',
        onConfirm?: () => void
    ) => {
        showDialogContext({
            type: DialogType.Alert,
            message: message,
            confirm: confirm,
            onConfirm: onConfirm,
        })
    }

    /** ⚠️ 제목 있는 알림 */
    const showAlertTitleDialog = (
        title: string,
        message: string,
        confirm: string = '확인',
        onConfirm?: () => void
    ) => {
        showDialogContext({
            type: DialogType.AlertTitle,
            title: title,
            message: message,
            confirm: confirm,
            onConfirm: onConfirm,
        })
    }

    /** ⚠️ 확인 / 취소 다이얼로그 (제목 없음) */
    const showConfirmDialog = (
        message: string,
        confirm: string = '확인',
        cancel: string = '취소',
        onConfirm?: () => void,
        onCancel?: () => void
    ) => {
        showDialogContext({
            type: DialogType.Confirm,
            message: message,
            confirm: confirm,
            cancel: cancel,
            onConfirm: onConfirm,
            onCancel: onCancel,
        })
    }

    /** ⚠️ 제목 있는 확인 / 취소 다이얼로그 */
    const showConfirmTitleDialog = (
        title: string,
        message: string,
        confirm: string = '확인',
        cancel: string = '취소',
        onConfirm?: () => void,
        onCancel?: () => void
    ) => {
        showDialogContext({
            type: DialogType.ConfirmTitle,
            title: title,
            message: message,
            confirm: confirm,
            cancel: cancel,
            onConfirm: onConfirm,
            onCancel: onCancel,
        })
    }

    // ✅ 4개 함수 export
    return {
        showAlertDialog,
        showAlertTitleDialog,
        showConfirmDialog,
        showConfirmTitleDialog,
    }
}
