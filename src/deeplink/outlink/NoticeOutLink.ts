import { MENU } from '@/src/navigation/NavigationTypes'
import { LinkItem } from '../DeepLinkManger'
import { LinkType, OutLink } from '../OutLink'
import { localHost, localScheme } from '@/src/utils/constants'

/** ✅ NoticeOutLink 클래스 (Swift → TypeScript 변환) */
export class NoticeOutLink extends OutLink {
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
        this.path = 'notice'
        this.linkType = LinkType.ToMain
        this.linkName = ''
    }

    /** ✅ 메뉴 리스트 반환 */
    getMenu(): LinkItem[] {
        const param = this.getParamInfo()

        // 설정 화면 링크 데이터
        // const settingsLink: LinkItem = { menu: MENU.SETTING.INDEX }

        // 공지 화면 데이터
        const noticeLink: LinkItem = {
            menu: MENU.NOTICE.INDEX,
        }

        // return [settingsLink, noticeLink]
        return [noticeLink]
    }

    /** ✅ 링크 타입 반환 */
    getLinkType(): LinkType | null {
        return this.linkType
    }
}
