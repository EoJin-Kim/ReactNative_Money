// OutLinker.ts

import { OutLink } from './OutLink'
import { NoticeOutLink } from './outlink/NoticeOutLink'
import { MainOutLink } from './outlink/MainOutLink'
import { ReceiptOutLink } from './outlink/ReceiptOutLink'

class OutLinker {
    private static instance: OutLinker
    private mList: OutLink[] = []
    private mCurrentLink: OutLink | null = null

    private constructor() {
        /** 📌 페이프로토콜 글로벌 커스텀 스키마 링크 */

        this.add(new NoticeOutLink()) // 공지사항
        this.add(new MainOutLink()) // 메인 화면 이동
        this.add(new ReceiptOutLink()) // 메인 화면 이동
    }

    /** ✅ 싱글톤 인스턴스 반환 */
    public static getInstance(): OutLinker {
        if (!OutLinker.instance) {
            OutLinker.instance = new OutLinker()
        }
        return OutLinker.instance
    }

    /** ✅ OutLink 객체 추가 */
    private add(linker: OutLink): void {
        this.mList.push(linker)
    }

    /** ✅ URI를 통해 OutLink 객체 찾기 */
    public find(url: string): OutLink | null {
        try {
            const uri = new URL(url)

            const scheme = uri.protocol ? uri.protocol.replace(':', '') : ''
            const host = uri.hostname || ''
            const path = uri.pathname ? uri.pathname.replace(/\//g, '') : ''
            const bundle = this.getParameter(uri)

            const command = `${scheme}${host}${path}`

            for (let link of this.mList) {
                const compString: string = link.compUriString
                console.log(`OutLinker link : ${compString}`)
                console.log(`OutLinker command : ${command}`)

                if (compString === command) {
                    link.uri = uri
                    link.bundle = bundle
                    this.mCurrentLink = link
                    return link
                }
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
        return null
    }

    /** ✅ 현재 링크 가져오기 / 설정하기 */
    public get current(): OutLink | null {
        return this.mCurrentLink
    }

    public set current(link: OutLink | null) {
        this.mCurrentLink = link
    }

    /** ✅ 현재 링크 삭제 */
    public removeCurrentLink(): void {
        if (this.mCurrentLink) {
            this.mCurrentLink.clear()
            this.mCurrentLink = null
        }
    }

    /** ✅ 현재 OutLink가 있는지 확인 */
    public hasOutLink(): boolean {
        return this.mCurrentLink !== null
    }

    /** ✅ URL에서 파라미터 가져오기 */
    private getParameter(uri: URL): Record<string, string> {
        const params = new URLSearchParams(uri.search)
        const result: Record<string, string> = {}

        params.forEach((value, key) => {
            result[key] = value
        })

        return result
    }
}

export default OutLinker.getInstance()
