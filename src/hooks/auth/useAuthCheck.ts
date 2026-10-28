import { useAuthContext } from '@/src/providers/AuthCheckProvider'
import {
    CheckList,
    AuthType,
    getAuthCheckList,
} from '@/src/utils/auth/CheckList'

export function useAuthCheck() {
    const { setNotAuth } = useAuthContext()
    let authCheckQueue: CheckList[] = []
    let successCallback: (() => void) | null = null

    const authCheck = (authType: AuthType, requestCallback: () => void) => {
        console.log('auth check start')

        successCallback = requestCallback
        authCheckQueue = getAuthCheckList(authType)

        console.log('auth check list : ', authCheckQueue)

        nextAuthCheck()
    }

    function nextAuthCheck() {
        if (authCheckQueue.length > 0) {
            const checkAuth = authCheckQueue.shift()

            if (checkAuth == CheckList.Check1) {
                checkAuth1()
            } else if (checkAuth == CheckList.Check2) {
                checkAuth2()
            } else if (checkAuth == CheckList.Check3) {
                checkAuth3()
            } else if (checkAuth == CheckList.Check4) {
                checkAuth4()
            }
        } else {
            console.log('success auth')
            successCallback?.()
        }
    }

    function checkAuth1() {
        console.log('auth 1')

        if (true) {
            nextAuthCheck()
        } else {
            authError(CheckList.Check1)
        }
    }

    function checkAuth2() {
        console.log('auth 2')

        if (false) {
            nextAuthCheck()
        } else {
            authError(CheckList.Check2)
        }
    }

    function checkAuth3() {
        console.log('auth 3')

        if (true) {
            nextAuthCheck()
        } else {
            authError(CheckList.Check3)
        }
    }

    function checkAuth4() {
        console.log('auth 4')

        if (true) {
            nextAuthCheck()
        } else {
            authError(CheckList.Check4)
        }
    }

    function authError(checkAuth: CheckList) {
        authCheckQueue = []
        setNotAuth(checkAuth)
    }

    return { authCheck }
}
