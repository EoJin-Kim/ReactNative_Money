import { RootStackParamList } from '@/src/navigation/NavigationTypes'
import Router from '@/src/navigation/Router'
import { localScheme, localHost } from '@/src/utils/constants'

/** ✅ DeepLink 인터페이스 정의 */
export interface DeepLink {
    moveDeepLink(): void
}

// /** ✅ LinkItem 인터페이스 (Swift의 `struct` 변환) */
// export interface LinkItem<K extends keyof RootStackParamList> {
//   menu: K;
//   data?: RootStackParamList[K];
// }

export type LinkItem = {
    [K in keyof RootStackParamList]: {
        menu: K
        data?: RootStackParamList[K]
    }
}[keyof RootStackParamList]

/** ✅ DeepLink 기본 동작을 제공하는 BaseDeepLink 클래스 */
export abstract class BaseDeepLink implements DeepLink {
    moveDeepLink(): void {
        const linkItem = DeepLinkManager.getInstance().getNextLink()
        if (!linkItem) return
        Router.moveToMenu(linkItem.menu, linkItem.data)
    }
}

/** ✅ DeepLinkManager (Swift 싱글톤 → TypeScript 싱글톤) */
export class DeepLinkManager {
    private static instance: DeepLinkManager
    private linkList: LinkItem[] = []

    private constructor() {}

    /** ✅ 싱글톤 인스턴스 반환 */
    public static getInstance(): DeepLinkManager {
        if (!DeepLinkManager.instance) {
            DeepLinkManager.instance = new DeepLinkManager()
        }
        return DeepLinkManager.instance
    }

    /** ✅ 딥링크 목록 설정 */
    setDeepLink(list: LinkItem[]): void {
        this.linkList = list
    }

    /** ✅ 다음 딥링크 가져오기 */
    getNextLink(): LinkItem | null {
        if (this.linkList.length === 0) return null
        return this.linkList.shift() || null
    }

    moveDeepLink(): void {
        const linkItem = DeepLinkManager.getInstance().getNextLink()
        if (!linkItem) return
        Router.moveToMenu(linkItem.menu, linkItem.data)
    }

    /** ✅ 모든 딥링크 제거 */
    clear(): void {
        this.linkList = []
    }
}

// const arg : WalletMainArg = {
//   id: "dsaf"
// }
// const a : LinkItem[] = [
//   {
//     menu : MENU.WALLET.INDEX,
//     data : arg
//   },

//   {
//     menu : MENU.INTRO.INDEX,
//   },
// ]
