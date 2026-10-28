import { MENU } from '@/src/navigation/NavigationTypes'
import { LinkItem } from '../DeepLinkManger'
import { LinkType, OutLink } from '../OutLink'
import { localHost, localScheme } from '@/src/utils/constants'

export class MainOutLink extends OutLink {
    scheme: string
    host: string
    path: string
    linkType: LinkType
    linkName: string

    constructor() {
        super()
        this.uri = undefined
        this.scheme = localScheme
        this.host = localHost
        this.path = 'main'
        this.linkType = LinkType.ToMain
        this.linkName = ''
    }

    /** ✅ 메뉴 리스트 반환 */
    getMenu(): LinkItem[] {
        const param = this.getParamInfo()
        if (param) {
            // 메인 화면 링크 데이터
            const mainLink: LinkItem = { menu: MENU.MAIN.INDEX }
            return [mainLink]
        }
        // 설정 화면 링크 데이터
        const link: LinkItem = { menu: MENU.MAIN.INDEX }
        return [link]
    }

    /** ✅ 링크 타입 반환 */
    getLinkType(): LinkType | null {
        return this.linkType
    }
}
