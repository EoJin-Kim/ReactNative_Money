import { sampleClient } from '@/src/api/axios'

// 타입 정의
export interface LoginRequest {
    email: string
    password: string
}

export interface GetResponse {
    userId: string
    id: string
    title: string
    body: string
}

export interface PostResponse {
    token: string
    user: {
        id: string
        email: string
        name: string
    }
}

/**
 * 인증 관련 API 서비스
 */
export const sampleApi = {

    sampleGet: () => sampleClient.get<GetResponse[]>('/posts'),

    samplePost: (data: LoginRequest) =>
        sampleClient.post<PostResponse>('/posts', data),

}
